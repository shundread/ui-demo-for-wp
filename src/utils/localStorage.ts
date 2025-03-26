export interface StorageFieldIdParams {
    uuid: string;
    field: string;
}

export function storageFieldId({ uuid, field }: StorageFieldIdParams) {
    return `${uuid}:${field}`;
}