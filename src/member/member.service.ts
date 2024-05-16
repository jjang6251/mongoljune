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

  async create(createMemberDto: CreateMemberDto): Promise<{message:string}> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(createMemberDto.password, saltRounds);
    const saveData = {
      userid: createMemberDto.userid,
      password: hash,
      name: createMemberDto.name,
      birth: createMemberDto.birth
    };
    const newMember = this.memberRepository.create(saveData);
    this.memberRepository.save(newMember);
    return {message:"회원가입 완료"}
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(userid: string) {
    return this.memberRepository.findOne({where: {userid}});
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
