import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {

  constructor(@InjectRepository(Member) private memberRepository:Repository<Member>){}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(createMemberDto.password, saltRounds);
    const saveData = {
      userid: createMemberDto.userid,
      password: hash,
      name: createMemberDto.name,
      birth: createMemberDto.birth
    };
    const newMember = this.memberRepository.create(saveData);
    return this.memberRepository.save(newMember);
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
