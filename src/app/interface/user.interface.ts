export interface userInterface {
  personalDetail: personalDetail[],
  post: posts[]
}

export interface personalDetail {
  id: string
  name: string,
  email: string
}

export interface posts {
  userId:string
  id: string,
  title:string,
  body:string
}
