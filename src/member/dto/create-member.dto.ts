export class CreateMemberDto {
    readonly userid: string;
    readonly password: string;
    readonly name: string;
    readonly birth: string;
    readonly is_parent: boolean;
    readonly child_id ?: string;
}
