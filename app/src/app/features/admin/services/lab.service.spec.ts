import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LabService } from './lab.service';
import { environment } from '../../../../environments/environment';

describe('LabService', () => {
    let labService: LabService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
            LabService
        ],
      });

      labService = TestBed.inject(LabService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    fit(`should fetch labs as an Observable`, waitForAsync(inject([HttpTestingController, LabService],
      (httpClient: HttpTestingController, labServices: LabService) => {

        const labItem = [
            {
                id: 7,
                name: 'qwqwqw',
                licensecode: '121212',
                city: 'sdafas',
                state: 'asdfasdf'
              },
              {
                id: 8,
                name: 'asd',
                licensecode: 'asdfa',
                city: 'asdf',
                state: 'asdfasdf'
              },
              {
                id: 9,
                name: 'asdf',
                licensecode: 'aas',
                city: 'a',
                state: 'asdf'
              }
        ];


        labServices.getLabs()
          .subscribe((labs: any) => {
            expect(labs.length).toBe(3);
          });

        const req = httpMock.expectOne(`${environment.apiBaseUrl2}/Lab`);
        expect(req.request.method).toBe('GET');

        req.flush(labItem);
        httpMock.verify();

      })));
  });

