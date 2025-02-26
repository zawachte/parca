// @generated by protobuf-ts 2.7.0 with parameter long_type_string,generate_dependencies
// @generated from protobuf file "parca/profilestore/v1alpha1/profilestore.proto" (package "parca.profilestore.v1alpha1", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * WriteRawRequest writes a pprof profile for a given tenant
 *
 * @generated from protobuf message parca.profilestore.v1alpha1.WriteRawRequest
 */
export interface WriteRawRequest {
    /**
     * tenant is the given tenant to store the pprof profile under
     *
     * @deprecated
     * @generated from protobuf field: string tenant = 1 [deprecated = true];
     */
    tenant: string;
    /**
     * series is a set raw pprof profiles and accompanying labels
     *
     * @generated from protobuf field: repeated parca.profilestore.v1alpha1.RawProfileSeries series = 2;
     */
    series: RawProfileSeries[];
    /**
     * normalized is a flag indicating if the addresses in the profile is normalized for position independent code
     *
     * @generated from protobuf field: bool normalized = 3;
     */
    normalized: boolean;
}
/**
 * WriteRawResponse is the empty response
 *
 * @generated from protobuf message parca.profilestore.v1alpha1.WriteRawResponse
 */
export interface WriteRawResponse {
}
/**
 * RawProfileSeries represents the pprof profile and its associated labels
 *
 * @generated from protobuf message parca.profilestore.v1alpha1.RawProfileSeries
 */
export interface RawProfileSeries {
    /**
     * LabelSet is the key value pairs to identify the corresponding profile
     *
     * @generated from protobuf field: parca.profilestore.v1alpha1.LabelSet labels = 1;
     */
    labels?: LabelSet;
    /**
     * samples are the set of profile bytes
     *
     * @generated from protobuf field: repeated parca.profilestore.v1alpha1.RawSample samples = 2;
     */
    samples: RawSample[];
}
/**
 * Label is a key value pair of identifiers
 *
 * @generated from protobuf message parca.profilestore.v1alpha1.Label
 */
export interface Label {
    /**
     * name is the label name
     *
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * value is the value for the label name
     *
     * @generated from protobuf field: string value = 2;
     */
    value: string;
}
/**
 * LabelSet is a group of labels
 *
 * @generated from protobuf message parca.profilestore.v1alpha1.LabelSet
 */
export interface LabelSet {
    /**
     * labels are the grouping of labels
     *
     * @generated from protobuf field: repeated parca.profilestore.v1alpha1.Label labels = 1;
     */
    labels: Label[];
}
/**
 * RawSample is the set of bytes that correspond to a pprof profile
 *
 * @generated from protobuf message parca.profilestore.v1alpha1.RawSample
 */
export interface RawSample {
    /**
     * raw_profile is the set of bytes of the pprof profile
     *
     * @generated from protobuf field: bytes raw_profile = 1;
     */
    rawProfile: Uint8Array;
}
// @generated message type with reflection information, may provide speed optimized methods
class WriteRawRequest$Type extends MessageType<WriteRawRequest> {
    constructor() {
        super("parca.profilestore.v1alpha1.WriteRawRequest", [
            { no: 1, name: "tenant", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "series", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => RawProfileSeries },
            { no: 3, name: "normalized", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<WriteRawRequest>): WriteRawRequest {
        const message = { tenant: "", series: [], normalized: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<WriteRawRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: WriteRawRequest): WriteRawRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string tenant = 1 [deprecated = true];*/ 1:
                    message.tenant = reader.string();
                    break;
                case /* repeated parca.profilestore.v1alpha1.RawProfileSeries series */ 2:
                    message.series.push(RawProfileSeries.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* bool normalized */ 3:
                    message.normalized = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: WriteRawRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string tenant = 1 [deprecated = true]; */
        if (message.tenant !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tenant);
        /* repeated parca.profilestore.v1alpha1.RawProfileSeries series = 2; */
        for (let i = 0; i < message.series.length; i++)
            RawProfileSeries.internalBinaryWrite(message.series[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* bool normalized = 3; */
        if (message.normalized !== false)
            writer.tag(3, WireType.Varint).bool(message.normalized);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.profilestore.v1alpha1.WriteRawRequest
 */
export const WriteRawRequest = new WriteRawRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class WriteRawResponse$Type extends MessageType<WriteRawResponse> {
    constructor() {
        super("parca.profilestore.v1alpha1.WriteRawResponse", []);
    }
    create(value?: PartialMessage<WriteRawResponse>): WriteRawResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<WriteRawResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: WriteRawResponse): WriteRawResponse {
        return target ?? this.create();
    }
    internalBinaryWrite(message: WriteRawResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.profilestore.v1alpha1.WriteRawResponse
 */
export const WriteRawResponse = new WriteRawResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RawProfileSeries$Type extends MessageType<RawProfileSeries> {
    constructor() {
        super("parca.profilestore.v1alpha1.RawProfileSeries", [
            { no: 1, name: "labels", kind: "message", T: () => LabelSet },
            { no: 2, name: "samples", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => RawSample }
        ]);
    }
    create(value?: PartialMessage<RawProfileSeries>): RawProfileSeries {
        const message = { samples: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RawProfileSeries>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RawProfileSeries): RawProfileSeries {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* parca.profilestore.v1alpha1.LabelSet labels */ 1:
                    message.labels = LabelSet.internalBinaryRead(reader, reader.uint32(), options, message.labels);
                    break;
                case /* repeated parca.profilestore.v1alpha1.RawSample samples */ 2:
                    message.samples.push(RawSample.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RawProfileSeries, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* parca.profilestore.v1alpha1.LabelSet labels = 1; */
        if (message.labels)
            LabelSet.internalBinaryWrite(message.labels, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated parca.profilestore.v1alpha1.RawSample samples = 2; */
        for (let i = 0; i < message.samples.length; i++)
            RawSample.internalBinaryWrite(message.samples[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.profilestore.v1alpha1.RawProfileSeries
 */
export const RawProfileSeries = new RawProfileSeries$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Label$Type extends MessageType<Label> {
    constructor() {
        super("parca.profilestore.v1alpha1.Label", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "value", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Label>): Label {
        const message = { name: "", value: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Label>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Label): Label {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* string value */ 2:
                    message.value = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Label, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* string value = 2; */
        if (message.value !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.value);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.profilestore.v1alpha1.Label
 */
export const Label = new Label$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LabelSet$Type extends MessageType<LabelSet> {
    constructor() {
        super("parca.profilestore.v1alpha1.LabelSet", [
            { no: 1, name: "labels", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Label }
        ]);
    }
    create(value?: PartialMessage<LabelSet>): LabelSet {
        const message = { labels: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<LabelSet>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LabelSet): LabelSet {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated parca.profilestore.v1alpha1.Label labels */ 1:
                    message.labels.push(Label.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LabelSet, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated parca.profilestore.v1alpha1.Label labels = 1; */
        for (let i = 0; i < message.labels.length; i++)
            Label.internalBinaryWrite(message.labels[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.profilestore.v1alpha1.LabelSet
 */
export const LabelSet = new LabelSet$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RawSample$Type extends MessageType<RawSample> {
    constructor() {
        super("parca.profilestore.v1alpha1.RawSample", [
            { no: 1, name: "raw_profile", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<RawSample>): RawSample {
        const message = { rawProfile: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RawSample>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RawSample): RawSample {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes raw_profile */ 1:
                    message.rawProfile = reader.bytes();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RawSample, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes raw_profile = 1; */
        if (message.rawProfile.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.rawProfile);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.profilestore.v1alpha1.RawSample
 */
export const RawSample = new RawSample$Type();
/**
 * @generated ServiceType for protobuf service parca.profilestore.v1alpha1.ProfileStoreService
 */
export const ProfileStoreService = new ServiceType("parca.profilestore.v1alpha1.ProfileStoreService", [
    { name: "WriteRaw", options: { "google.api.http": { post: "/profiles/writeraw", body: "*" } }, I: WriteRawRequest, O: WriteRawResponse }
]);
