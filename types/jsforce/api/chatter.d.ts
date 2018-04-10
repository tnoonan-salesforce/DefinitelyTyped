import { Connection, callback } from '../connection';
import { Stream } from 'stream';
import { Query } from '../query';

interface BatchRequestParams extends RequestParams {
    method: string;
    url: string;
    richInput?: string;
}

interface BatchRequestResult {
    statusCode: string;
    result: RequestResult;
}

interface BatchRequestResults {
    hasError: boolean;
    results: BatchRequestResult[];
}

interface RequestParams {
    method: string;
    url: string;
    body?: string;
}

export class RequestResult {
}

export class Request<T> implements Promise<T> {
    constructor(chatter: Chatter<T>, params: RequestParams);

    batchParams(): BatchRequestParams;

    promise(): Promise<T>;

    stream(): Stream;

    catch<TResult>(onrejected?: ((reason: any) => (PromiseLike<TResult> | TResult)) | null | undefined): Promise<T | TResult>;

    then<TResult1, TResult2>(onfulfilled?: ((value: T) => (PromiseLike<TResult1> | TResult1)) | null | undefined,
                             onrejected?: ((reason: any) => (PromiseLike<TResult2> | TResult2)) | null | undefined): Promise<TResult1 | TResult2>;

    thenCall(callback?: (err: Error, records: T) => void): Query<T>;

    readonly [Symbol.toStringTag]: 'Promise';
}

export class Resource<T> extends Request<T> {
    constructor(chatter: Chatter<T>, url: string, queryParams?: object);

    create(data: object, callback?: callback<RequestResult>): Request<RequestResult>;

    del(callback?: callback<RequestResult>): Request<RequestResult>;

    delete(callback?: callback<RequestResult>): Request<RequestResult>;

    retrieve(callback?: callback<Request<T>>): Request<T>;

    update(data: object, callback?: callback<RequestResult>): Request<RequestResult>;
}

export class Chatter<T> {
    constructor(conn: Connection);

    batch(callback?: callback<BatchRequestResults>): Promise<BatchRequestResults>;

    request(params: RequestParams, callback?: callback<Request<RequestResult>>): Request<RequestResult>;

    resource(url: string, queryParams?: object): Resource<RequestResult>
}
