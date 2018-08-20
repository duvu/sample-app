import { CompanyRoutingModule } from './company-routing.module';

describe('CompanyRoutingModule', () => {
  let companyRoutingModule: CompanyRoutingModule;

  beforeEach(() => {
    companyRoutingModule = new CompanyRoutingModule();
  });

  it('should create an instance', () => {
    expect(companyRoutingModule).toBeTruthy();
  });
});
