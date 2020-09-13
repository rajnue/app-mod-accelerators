import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi } from './log-publishers';

const PUBLISHERS_FILE = '/src/app/assets/log-publishers.json';

@Injectable()
export class LogPublishersService {
    constructor() {
        // Build publishers arrays
        this.buildPublishers();
    }

    // Public properties
    publishers: LogPublisher[] = [];

    // Build publishers array
    buildPublishers(): void {
        // Create instance of LogConsole Class
        this.publishers.push(new LogConsole());
        // Create instance of LogLocalStorage Class
        this.publishers.push(new LogLocalStorage());
        // Create instance of LogWebAPI Class
        this.publishers.push(new LogWebApi());
    }

    /* If you want to use JSON file based configuration then use this method and have to use Http Module here
    buildPublishers(): void {
        let logPub: LogPublisher;

        this.getLoggers().subscribe(response => {
            for (let pub of response.filter(p => p.isActive)) {
                switch (pub.loggerName.toLowerCase()) {
                    case "console":
                        logPub = new LogConsole();
                        break;
                    case "localstorage":
                        logPub = new LogLocalStorage();
                        break;
                    case "webapi":
                        logPub = new LogWebApi(this.http);
                        break;
                }
                // Set location of logging
                logPub.location = pub.loggerLocation;
                // Add publisher to array
                this.publishers.push(logPub);
            }
        });
    }
    getLoggers(): Observable<LogPublisherConfig[]> {
        return this.http.get(PUBLISHERS_FILE)
            .map(response => response.json())
            .catch(this.handleErrors);
    }
    */
}
