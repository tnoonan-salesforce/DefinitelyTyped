interface ReportInfo {}

export class Dashboard {
    describe(callback: () => any): Promise<any>;
    del(callback: () => any): Promise<any>;
    destory(callback: () => any): Promise<any>;
    delete(callback: () => any): Promise<any>;
    components(componentIds: () => any | string[] | string, callback: () => any): Promise<any>;
    status(callback: () => any): Promise<any>;
    refresh(callback: () =>  any): Promise<any>;
    clone(name: string | object, folderid: string, callback: () => any): Promise<any>;
}

export class ReportInstance {
    retrieve(callback: () => any): Promise<any>
}

export class Report {
    describe(callback: () => any): Promise<any>;
    del(callback: () => any): Promise<any>;
    destory(callback: () => any): Promise<any>;
    delete(callback: () => any): Promise<any>;
    clone(name: string, callback: () => any): Promise<any>;
    explain(callback: () => any): Promise<any>;
    run(options: () => any | object, callback: () => any): Promise<any>;
    exec(options: () => any | object, callback: () => any): Promise<any>;
    execute(options: () => any | object, callback: () => any): Promise<any>;
    executeAsync(options: () => any | object, callback: () => any): Promise<any>;
    instance(id: string): ReportInstance;
    instances(callback: () => any): any[];
}

export class Analytics {
    report(id: string): Promise<Report>;
    reports(callback: () => ReportInfo[]): Promise<ReportInfo[]>;
    dashboard(id: string): Promise<Dashboard>;
    dashboards(callback: () => any[]): Promise<any>;
}
