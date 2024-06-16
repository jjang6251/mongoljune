import { CreateMemberDto } from "../dto/create-member.dto";

export interface Memberinter {

    create(createMemberDto: CreateMemberDto): Promise<{message:string}>;

}
