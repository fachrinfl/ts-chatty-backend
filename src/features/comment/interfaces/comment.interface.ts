import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface ICommentDocument extends Document {
  _id?: string | ObjectId;
  username: string;
  avatarColor: string;
  postId: string;
  profilePicture: string;
  comment: string;
  createdAt?: Date;
  userTo?: string | ObjectId;
}

export interface ICommentJob {
  postId: string;
  userTo: string;
  userFrom: string;
  username: string;
  comment: ICommentDocument;
}

export interface ICommentNameList {
  count: number;
  names: string[];
}

export interface IQueryComment {
  _id?: string | ObjectId;
  postId?: string | ObjectId;
}

export interface IQuerySort {
  createdAt?: number;
}
{"threads":[{"position":0,"start":0,"end":337,"connection":"open"},{"position":674,"start":338,"end":674,"connection":"closed"}],"url":"https://att-c.udemycdn.com/2022-09-03_08-52-33-7638438d6ab98bcb112202353c961bbf/original.ts?response-content-disposition=attachment%3B+filename%3Dcomment.interface.ts&Expires=1662719847&Signature=g8TG-tkOqdnEWFuRN0DmIVo4HNnMA5S9TNkP9HNYMzjFTVw2pQjqlWnYeU9KCLtEo3YF8Q-Bx5eYpubboBeNEZg1gRfSr4W-Wiu7IpLhXuxQUcYab8Gd0XI1HFGfrIqStRNZAViUkoC1aI4BsYmJUpZ6aOID5dHhjymxwtDaXEyf8rF6CLbT4pvlWLwXwPSroHwma~Ywe8dkminHFyQYKcOgy-CnhiiIxKqgeRbmv0oK6~55UdRRoqrCRQVVLadoWbSSHUUWjLqeeUQug3DZ6PfLPMJ2fOqgwXBDAhIm5bhkgdayyh~WZT9rSgj-t3gyp6Jj-lkN7FtxuAZyNkq-gg__&Key-Pair-Id=APKAITJV77WS5ZT7262A","method":"GET","port":443,"downloadSize":674,"headers":{"content-type":"binary/octet-stream","content-length":"674","connection":"close","date":"Fri, 09 Sep 2022 06:11:06 GMT","last-modified":"Sat, 03 Sep 2022 08:52:34 GMT","etag":"\"c21d19d170e6a53367aa5228d819e7e0\"","x-amz-server-side-encryption":"AES256","x-amz-meta-qqfilename":"comment.interface.ts","x-amz-version-id":"NrEW1IkiZvqlyUaR6aJsxDQMO3nv29mf","content-disposition":"attachment; filename=comment.interface.ts","accept-ranges":"bytes","server":"AmazonS3","x-cache":"Miss from cloudfront","via":"1.1 241b025da3883bdb653910a6da97c0a8.cloudfront.net (CloudFront)","x-amz-cf-pop":"AMS1-C1","x-amz-cf-id":"SIpoDa0ebqmCV1acfN_oW0C_3FAwzHo8F1RT3GKHz8_qRamcHam-Aw=="}}
