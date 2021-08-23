import React, { useRef, useState, useEffect } from 'react'
import { FormControl, ListGroup, Overlay } from 'react-bootstrap'
import { Query } from '@parca/parser'
import { LabelsResponse, LabelsRequest, QueryClient, ServiceError } from '@parca/client'

interface MatchersInputProps {
  queryClient: QueryClient
  setMatchersString: (string) => void
  runQuery: () => void
  currentQuery: Query
}

export interface ILabelNamesResult {
  response: LabelsResponse.AsObject|null
  error: ServiceError|null
}

export const useLabelNames = (client: QueryClient): ILabelNamesResult => {
  const [result, setResult] = useState<ILabelNamesResult>({
    response: null,
    error: null
  })

  useEffect(() => {
    client.labels(
      new LabelsRequest(),
      (error: ServiceError|null, responseMessage: LabelsResponse|null) => {
        const res = responseMessage == null ? null : responseMessage.toObject()

        setResult({
          response: res,
          error: error
        })
      }
    )
  }, [client])

  return result
}

class Suggestion {
  type: string
  typeahead: string
  value: string

  constructor (type: string, typeahead: string, value: string) {
    this.type = type
    this.typeahead = typeahead
    this.value = value
  }
}

class Suggestions {
  literals: Suggestion[]
  labelNames: Suggestion[]

  constructor () {
    this.literals = []
    this.labelNames = []
  }
}

const MatchersInput = ({
  queryClient,
  setMatchersString,
  runQuery,
  currentQuery
}: MatchersInputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focusedInput, setFocusedInput] = useState(false)
  const [showSuggest, setShowSuggest] = useState(true)
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(-1)
  const [lastCompleted, setLastCompleted] = useState<Suggestion>(new Suggestion('', '', ''))

  const { response: labelNamesResponse, error: labelNamesError } = useLabelNames(queryClient)
  const labelNames =
    (labelNamesError === undefined || labelNamesError == null) && labelNamesResponse !== undefined && labelNamesResponse != null
      ? labelNamesResponse.labelNamesList.filter(e => e !== '__name__') // TODO(kakkoyun): ??
      : []

  const value = currentQuery.matchersString()
  const suggestionSections = new Suggestions()
  Query.suggest(`{${value}`).forEach(function (s) {
    // Skip suggestions that we just completed. This really only works,
    // because we know the language is not repetitive. For a language that
    // has a repeating word, this would not work.
    if (lastCompleted !== null && lastCompleted.type === s.type) {
      return
    }

    // Need to figure out if any literal suggestions make sense, but a
    // closing bracket doesn't in the guided query experience because all
    // we have the user do is type the matchers.
    if (s.type === 'literal' && s.value !== '}') {
      suggestionSections.literals.push({
        type: s.type,
        typeahead: '',
        value: s.value
      })
    }
    if (s.type === 'labelName') {
      const inputValue = s.typeahead.trim().toLowerCase()
      const inputLength = inputValue.length
      const matches = labelNames.filter(function (label) {
        return label.toLowerCase().slice(0, inputLength) === inputValue
      })

      matches.forEach(m =>
        suggestionSections.labelNames.push({
          type: s.type,
          typeahead: s.typeahead,
          value: m
        })
      )
    }
  })
  const suggestionsLength =
    suggestionSections.literals.length + suggestionSections.labelNames.length

  const resetHighlight = (): void => setHighlightedSuggestionIndex(-1)
  const resetLastCompleted = (): void => setLastCompleted(new Suggestion('', '', ''))

  const onChange = (e): void => {
    const newValue = e.target.value
    setMatchersString(newValue)
    resetLastCompleted()
    resetHighlight()
  }

  const complete = (suggestion: Suggestion): string => {
    return value.slice(0, value.length - suggestion.typeahead.length) + suggestion.value
  }

  const getSuggestion = (index): Suggestion => {
    if (index < suggestionSections.labelNames.length) {
      return suggestionSections.labelNames[index]
    }
    return suggestionSections.literals[index - suggestionSections.labelNames.length]
  }

  const highlightNext = (): void => {
    const nextIndex = highlightedSuggestionIndex + 1
    if (nextIndex === suggestionsLength) {
      resetHighlight()
      return
    }
    setHighlightedSuggestionIndex(nextIndex)
  }

  const highlightPrevious = (): void => {
    if (highlightedSuggestionIndex === -1) {
      // Didn't select anything, so starting at the bottom.
      setHighlightedSuggestionIndex(suggestionsLength - 1)
      return
    }

    setHighlightedSuggestionIndex(highlightedSuggestionIndex - 1)
  }

  const applySuggestion = (suggestionIndex: number): void => {
    const suggestion = getSuggestion(suggestionIndex)
    const newValue = complete(suggestion)
    resetHighlight()
    setLastCompleted(suggestion)
    setMatchersString(newValue)
    if (inputRef?.current !== null) {
      inputRef.current.value = newValue
      inputRef.current.focus()
    }
  }

  const applyHighlightedSuggestion = (): void => {
    applySuggestion(highlightedSuggestionIndex)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // If there is a highlighted suggestion and enter is hit, we complete
    // with the highlighted suggestion.
    if (highlightedSuggestionIndex >= 0 && event.key === 'Enter') {
      applyHighlightedSuggestion()
    }

    // If no suggestions is highlighted and we hit enter, we run the query,
    // and hide suggestions until another actions enables them again.
    if (highlightedSuggestionIndex === -1 && event.key === 'Enter') {
      setShowSuggest(false)
      runQuery()
      return
    }

    setShowSuggest(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Don't need to handle any key interactions if no suggestions there.
    if (suggestionsLength === 0) {
      return
    }

    // Handle tabbing through suggestions.
    if (event.key === 'Tab' && suggestionsLength > 0) {
      event.preventDefault()
      if (event.shiftKey) {
        // Shift + tab goes up.
        highlightPrevious()
        return
      }
      // Just tab goes down.
      highlightNext()
    }

    // Up arrow highlights previous suggestions.
    if (event.key === 'ArrowUp') {
      highlightPrevious()
    }

    // Down arrow highlights next suggestions.
    if (event.key === 'ArrowDown') {
      highlightNext()
    }
  }

  const focus = (): void => {
    setFocusedInput(true)
  }

  const unfocus = (): void => {
    setFocusedInput(false)
    resetHighlight()
  }

  return (
    <>
      <FormControl
        ref={inputRef}
        onChange={onChange}
        onBlur={unfocus}
        onFocus={focus}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        placeholder='Filter profiles by labels...'
        className='queryExpressionInput'
        value={value}
      />
      <Overlay target={inputRef.current} show={focusedInput && showSuggest} placement='bottom'>
        {({ show: _show, ...props }) => (
          <div
            {...props}
            style={{
              width: inputRef.current?.offsetWidth,
              maxHeight: 200,
              backgroundColor: 'white',
              ...props.style
            }}
          >
            <ListGroup style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              {suggestionSections.labelNames.map((l, i) => (
                <ListGroup.Item
                  key={i}
                  active={highlightedSuggestionIndex === i}
                  onMouseOver={() => setHighlightedSuggestionIndex(i)}
                  onClick={() => applySuggestion(i)}
                  onMouseOut={() => resetHighlight()}
                >
                  {l.value}
                </ListGroup.Item>
              ))}
              {suggestionSections.literals.map((l, i) => (
                <ListGroup.Item
                  key={i}
                  active={highlightedSuggestionIndex === i + suggestionSections.labelNames.length}
                  onMouseOver={() =>
                    setHighlightedSuggestionIndex(i + suggestionSections.labelNames.length)
                  }
                  onClick={() => applySuggestion(i + suggestionSections.labelNames.length)}
                  onMouseOut={() => resetHighlight()}
                >
                  {l.value}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Overlay>
    </>
  )
}

export default MatchersInput