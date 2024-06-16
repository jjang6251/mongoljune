import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { Memberinter } from './interface/member.interface';

// const mockMemberService: Partial<Memberinter> = {
//   create: jest
// }

describe('MemberService', () => {
  let service: Memberinter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
