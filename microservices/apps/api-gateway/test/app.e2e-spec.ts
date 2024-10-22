import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
<<<<<<<< HEAD:microservices/apps/api-gateway/test/app.e2e-spec.ts
import { ApiGatewayModule } from './../src/api-gateway.module';
========
import { CoursesModule } from '../src/courses-main.module';
>>>>>>>> e56528bc48eab4cf52b7cd4f895716cc1f39bb09:microservices/apps/courses/test/app.e2e-spec.ts

describe('ApiGatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
