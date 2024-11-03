export interface UserInfo {
  username: string;
  phoneNum: string;
  fullName: string;
  nickname: string;
  point: number;
  status: string;
  role: string;
  sck: string | null;
}

export interface BoardItem {
  id: number;
  username: string;
  nickname: string;
  userIp: string;
  title: string;
  hit: number;
  hate: number;
  likes: number;
  replyNum: number;
  createdDt: Date;
}

export interface BoardItem2 {
  id: number;
  postType: number;
  username: string;
  nickname: string;
  userIp: string;
  title: string;
  hit: number;
  hate: number;
  likes: number;
  replyNum: number;
  createdDt: Date;
}

export interface PhotoItem {
  id: number;
  postType: number;
  username: string;
  nickname: string;
  userIp: string;
  thumbNail: string;
  title: string;
  code: string;
  hit: number;
  hate: number;
  likes: number;
  replyNum: number;
  createdDt: Date;
}

export interface BoardDetailClientProps {
  content: {
    id: number;
    username: string;
    nickname: string;
    title: string;
    content: string;
    hit: number;
    hate: number;
    likes: number;
    replyNum: number;
    createdDt: string;
    notification: boolean;
  };
}

export interface Comment {
  id: number;
  content: string;
  username: string;
  nickname: string;
  deleted: boolean;
  createdDt: string;
}

export type CommentRequest = {
  boardId: string;
  username: string;
  content: string;
};

export type savePostRequest = {
  postType: number;
  notification: boolean;
  title: string;
  content: string;
  thumbNail: string | null;
};

export type Member = {
  id: number;
  username: string;
  phoneNum: string;
  fullName: string;
  nickname: string;
  point: number;
  exp: number;
  status: string;
  createdDt: string;
  lastLogin: string | null;
};

export type MemberDataResponse = {
  status: string;
  code: string;
  message: string;
  data: {
    content: Member[];
    pageable: {
      offset: number;
      pageSize: number;
      pageNumber: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
};

export interface Banner {
  id: number;
  partnerName: string;
  thumbNail: string;
  partnerUrl: string;
  clickNum: number;
}

export const colors = [
  "transparent",
  "white",
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "gray",
  "black",
];
export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
];
