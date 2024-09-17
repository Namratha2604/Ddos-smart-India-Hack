declare module 'ip2location-io-nodejs' {
    export class Configuration {
        constructor(apiKey: string);
    }
    export class IPGeolocation {
        constructor(config: Configuration);
        lookup(ip: string, lang?: string): Promise<any>;
    }
}