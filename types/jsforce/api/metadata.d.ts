import { callback, Connection } from '../connection';
import { EventEmitter } from 'events';
import { Stream } from 'stream';

interface DeployResult {
    id: string;
    checkOnly: boolean;
    completedDate: string;
    createdDate: string;
    details?: object[];
    done: boolean;
    errorMessage?: string;
    errorStatusCode?: string;
    ignoreWarnings?: boolean;
    lastModifiedDate: string;
    numberComponentErrors: number;
    numberComponentsDeployed: number;
    numberComponentsTotal: number;
    numberTestErrors: number;
    numberTestsCompleted: number;
    numberTestsTotal: number;
    rollbackOnError?: boolean;
    startDate: string;
    status: string;
    success: boolean;
}

interface MetadataObject {
    childXmlNames: string[];
    directoryName: string;
    inFolder: boolean;
    metaFile: boolean;
    suffix: string;
    xmlName: string;
}

interface DescribeMetadataResult {
    metadataObjects: MetadataObject[];
    organizationNamespace: string;
    partialSaveAllowed: boolean;
    testRequired: boolean;
}

interface FileProperties {
    type: string;
    createdById: string;
    createdByName: string;
    createdDate: string;
    fileName: string;
    fullName: string;
    id: string;
    lastModifiedById: string;
    lastModifiedByName: string;
    lastModifiedDate: string;
    manageableState?: string;
    namespacePrefix?: string;
}

interface ListMetadataQuery {
    type: string;
    folder?: string;
}

interface MetadataInfo {
    fullname: string;
}

interface RetrieveRequest {
}

interface RetrieveResult {
    fileProperties: FileProperties[];
    id: string;
    messages: object[];
    zipFile: string
}

interface SaveResult {
    success: boolean;
    fullName: string;
}

interface UpdateMetadataInfo {
    currentName: string;
    metadata: MetadataInfo;
}

interface UpsertResult {
    success: boolean;
    fullName: string;
    created: boolean;
}

interface AsyncResult {
    done: boolean;
    id: string;
    state: string;
    statusCode?: string;
    message?: string;
}

interface DeployOptions {
    allowMissingFiles?:	boolean;
    autoUpdatePackage?: boolean;
    checkOnly?:	boolean;
    ignoreWarnings?: boolean;
    performRetrieve?: boolean;
    purgeOnDelete?: boolean;
    rollbackOnError?: boolean;
    runAllTests?: boolean;
    runTests?: string[];
    singlePackage?:	boolean;
}

export class AsyncResultLocator<T> extends EventEmitter implements Promise<T> {
    check(callback?: callback<T>): Promise<T>

    complete(callback?: callback<T>): Promise<T>

    poll(interval: number, timeout: number): void;

    catch<TResult>(onrejected?: ((reason: any) => (PromiseLike<TResult> | TResult)) | null | undefined): Promise<T | TResult>;

    then<TResult1, TResult2>(onfulfilled?: ((value: T) => (PromiseLike<TResult1> | TResult1)) | null | undefined,
                             onrejected?: ((reason: any) => (PromiseLike<TResult2> | TResult2)) | null | undefined): Promise<TResult1 | TResult2>;

    readonly [Symbol.toStringTag]: "Promise";
}

export class DeployResultLocator<T> extends AsyncResultLocator<T> {}
export class RetrieveResultLocator<T> extends AsyncResultLocator<T> {}

export class Metadata {
    pollInterval: number;
    pollTimeout: number;

    constructor(conn: Connection);

    checkDeployStatus(id: string, includeDetails?: boolean, callback?: callback<DeployResult>): Promise<DeployResult>

    checkRetrieveStatus(id: string, callback?: callback<RetrieveResult>): Promise<RetrieveResult>

    checkStatus(ids: string | string[], callback?: callback<AsyncResult>): AsyncResultLocator<AsyncResult>

    createAsync(type: string, metadata: MetadataInfo | MetadataInfo[], callback: callback<AsyncResult>): Promise<AsyncResultLocator<AsyncResult>>

    createSync(type: string, metadata: MetadataInfo, callback?: callback<SaveResult>): SaveResult | SaveResult[]

    del(type: string, metadata: string | string[] | MetadataInfo | MetadataInfo[], callback?: callback<AsyncResult>): AsyncResultLocator<AsyncResult>

    delete(type: string, callback?: callback<SaveResult>): Promise<SaveResult>;

    deleteAsync(type: string, metadata: string | string[] | MetadataInfo | MetadataInfo[], callback?: callback<AsyncResult>): AsyncResultLocator<AsyncResult>

    deleteSync(type: string, fullNames: string | string[], callback?: callback<SaveResult>): Promise<SaveResult>;

    deploy(zipInput: Stream | Buffer | string, options: DeployOptions, callback?:callback<AsyncResult>): DeployResultLocator<AsyncResult>;

    describe(version?: string, callback?: callback<DescribeMetadataResult>): Promise<DescribeMetadataResult>;

    list(queries: ListMetadataQuery | ListMetadataQuery[], version?: string, callback?: callback<FileProperties[]>): Promise<FileProperties[]>;

    read(type: string, fullNames: string | string[], callback?: callback<MetadataInfo | MetadataInfo[]>): Promise<MetadataInfo | MetadataInfo[]>;

    readSync(type: string, fullNames: string | string[], callback?: callback<MetadataInfo | MetadataInfo[]>): Promise<MetadataInfo | MetadataInfo[]>;

    rename(type: string, oldFullName: string, newFullName: string, callback?: callback<SaveResult>): Promise<SaveResult>

    retrieve(request: RetrieveRequest, callback: callback<AsyncResult>): RetrieveResultLocator<AsyncResult>

    update(type: string, updateMetadata: MetadataInfo | MetadataInfo[], callback?: callback<SaveResult | SaveResult[]>): Promise<SaveResult | SaveResult[]>

    updateSync(type: string, updateMetadata: MetadataInfo | MetadataInfo[], callback?: callback<SaveResult | SaveResult[]>): Promise<SaveResult | SaveResult[]>

    upsert(type: string, metadata: MetadataInfo | MetadataInfo[], callback?: callback<UpsertResult | UpsertResult[]>): Promise<UpsertResult | UpsertResult[]>
}
