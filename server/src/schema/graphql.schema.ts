
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class RegisterInput {
    name: string;
    username: Email;
    password: string;
}

export class AddLinkInput {
    link: string;
}

export class User {
    id?: string;
    name?: string;
    email?: string;
}

export class Token {
    accessToken: string;
}

export abstract class IQuery {
    abstract login(username: Email, password: string): Token | Promise<Token>;

    abstract getLinks(page?: number, limit?: number): Link[] | Promise<Link[]>;
}

export abstract class IMutation {
    abstract register(registerInput?: RegisterInput): User | Promise<User>;

    abstract addLink(addLinkInput?: AddLinkInput): Link | Promise<Link>;
}

export class Link {
    id?: string;
    link?: string;
    title?: string;
    description?: string;
    likeCount?: number;
    createdAt?: string;
    createdBy?: string;
}

export type Email = any;
