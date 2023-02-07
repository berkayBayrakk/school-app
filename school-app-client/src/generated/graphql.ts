import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum Color {
  Blue = 'Blue',
  Red = 'Red',
  White = 'White'
}

export type CreatePostInput = {
  color: Color;
  id?: InputMaybe<Scalars['Int']>;
  studentId: Scalars['Int'];
  text: Scalars['String'];
};

export type CreateStudentInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type GetStudentInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Student interface */
export type IStudent = {
  id: Scalars['Int'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  receiverStudent: Student;
  receiverStudentId: Scalars['Int'];
  sendTime: Scalars['DateTime'];
  senderStudent: Student;
  senderStudentId: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createStudent: Student;
  deletePost: Post;
  deleteStudent: Student;
  sendMessage: Message;
  updatePost: Post;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  data: SendMessageInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  student?: Maybe<Student>;
  studentId: Scalars['Int'];
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  message: Message;
  messageTwoStudent: Array<Message>;
  post: Post;
  posts: Array<Post>;
  student: Student;
  students: Array<Student>;
  studentsSearch: Array<Student>;
};


export type QueryMessageArgs = {
  id: Scalars['Int'];
};


export type QueryMessageTwoStudentArgs = {
  id1: Scalars['Int'];
  id2: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryStudentArgs = {
  data: GetStudentInput;
};


export type QueryStudentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryStudentsSearchArgs = {
  email?: InputMaybe<Scalars['String']>;
  isInsensitive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type SendMessageInput = {
  receiverStudentId: Scalars['Int'];
  senderStudentId: Scalars['Int'];
  title: Scalars['String'];
};

export type Student = IStudent & {
  __typename?: 'Student';
  email: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  posts: Array<Maybe<Post>>;
  receivedMessages: Array<Maybe<Message>>;
  sendedMessages: Array<Maybe<Message>>;
  sendedMessagesTo: Array<Maybe<Message>>;
};


export type StudentPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type StudentSendedMessagesToArgs = {
  toId: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSended: Message;
  messageSendedd: Message;
};


export type SubscriptionMessageSendedArgs = {
  receiver: Scalars['Int'];
  sender: Scalars['Int'];
};

export type UpdatePostInput = {
  color: Color;
  id?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type MessageSendedSubscriptionVariables = Exact<{
  sender: Scalars['Int'];
  receiver: Scalars['Int'];
}>;


export type MessageSendedSubscription = { __typename?: 'Subscription', messageSended: { __typename?: 'Message', id: number, title: string, sendTime: any, receiverStudentId: number, senderStudentId: number } };

export type GetMessagesTwoStudentQueryVariables = Exact<{
  id1: Scalars['Int'];
  id2: Scalars['Int'];
}>;


export type GetMessagesTwoStudentQuery = { __typename?: 'Query', messageTwoStudent: Array<{ __typename?: 'Message', id: number, title: string, sendTime: any, receiverStudentId: number, senderStudentId: number }> };

export type SendMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, title: string, sendTime: any, receiverStudentId: number, senderStudentId: number } };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, text: string, color: string } };

export type GetStudentPostsQueryVariables = Exact<{
  data: GetStudentInput;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetStudentPostsQuery = { __typename?: 'Query', student: { __typename?: 'Student', posts: Array<{ __typename?: 'Post', color: string, updatedAt?: any | undefined, createdAt: any, id: number, text: string } | undefined> } };

export type UpdatePostMutationVariables = Exact<{
  data: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number, text: string, color: string } };

export type CreateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: number, name?: string | undefined, email: string } };

export type DeleteStudentByIdMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStudentByIdMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: number, email: string, name?: string | undefined } };

export type GetSendedMessagesToQueryVariables = Exact<{
  data: GetStudentInput;
  receiverId: Scalars['Int'];
}>;


export type GetSendedMessagesToQuery = { __typename?: 'Query', student: { __typename?: 'Student', sendedMessagesTo: Array<{ __typename?: 'Message', id: number, title: string, sendTime: any, receiverStudentId: number, senderStudentId: number } | undefined> } };

export type GetStudentWithoutPostsQueryVariables = Exact<{
  data: GetStudentInput;
}>;


export type GetStudentWithoutPostsQuery = { __typename?: 'Query', student: { __typename?: 'Student', id: number, email: string, name?: string | undefined } };

export type GetStudentsWithoutPostsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetStudentsWithoutPostsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'Student', id: number, email: string, name?: string | undefined }> };


export const MessageSendedDocument = gql`
    subscription MessageSended($sender: Int!, $receiver: Int!) {
  messageSended(sender: $sender, receiver: $receiver) {
    id
    title
    sendTime
    receiverStudentId
    senderStudentId
  }
}
    `;

/**
 * __useMessageSendedSubscription__
 *
 * To run a query within a React component, call `useMessageSendedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSendedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSendedSubscription({
 *   variables: {
 *      sender: // value for 'sender'
 *      receiver: // value for 'receiver'
 *   },
 * });
 */
export function useMessageSendedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSendedSubscription, MessageSendedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSendedSubscription, MessageSendedSubscriptionVariables>(MessageSendedDocument, options);
      }
export type MessageSendedSubscriptionHookResult = ReturnType<typeof useMessageSendedSubscription>;
export type MessageSendedSubscriptionResult = Apollo.SubscriptionResult<MessageSendedSubscription>;
export const GetMessagesTwoStudentDocument = gql`
    query getMessagesTwoStudent($id1: Int!, $id2: Int!) {
  messageTwoStudent(id1: $id1, id2: $id2) {
    id
    title
    sendTime
    receiverStudentId
    senderStudentId
  }
}
    `;

/**
 * __useGetMessagesTwoStudentQuery__
 *
 * To run a query within a React component, call `useGetMessagesTwoStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesTwoStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesTwoStudentQuery({
 *   variables: {
 *      id1: // value for 'id1'
 *      id2: // value for 'id2'
 *   },
 * });
 */
export function useGetMessagesTwoStudentQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesTwoStudentQuery, GetMessagesTwoStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesTwoStudentQuery, GetMessagesTwoStudentQueryVariables>(GetMessagesTwoStudentDocument, options);
      }
export function useGetMessagesTwoStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesTwoStudentQuery, GetMessagesTwoStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesTwoStudentQuery, GetMessagesTwoStudentQueryVariables>(GetMessagesTwoStudentDocument, options);
        }
export type GetMessagesTwoStudentQueryHookResult = ReturnType<typeof useGetMessagesTwoStudentQuery>;
export type GetMessagesTwoStudentLazyQueryHookResult = ReturnType<typeof useGetMessagesTwoStudentLazyQuery>;
export type GetMessagesTwoStudentQueryResult = Apollo.QueryResult<GetMessagesTwoStudentQuery, GetMessagesTwoStudentQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($data: SendMessageInput!) {
  sendMessage(data: $data) {
    id
    title
    sendTime
    receiverStudentId
    senderStudentId
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    id
    text
    color
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetStudentPostsDocument = gql`
    query getStudentPosts($data: GetStudentInput!, $offset: Int, $limit: Int) {
  student(data: $data) {
    posts(offset: $offset, limit: $limit) {
      color
      updatedAt
      createdAt
      id
      text
    }
  }
}
    `;

/**
 * __useGetStudentPostsQuery__
 *
 * To run a query within a React component, call `useGetStudentPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentPostsQuery({
 *   variables: {
 *      data: // value for 'data'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetStudentPostsQuery(baseOptions: Apollo.QueryHookOptions<GetStudentPostsQuery, GetStudentPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentPostsQuery, GetStudentPostsQueryVariables>(GetStudentPostsDocument, options);
      }
export function useGetStudentPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentPostsQuery, GetStudentPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentPostsQuery, GetStudentPostsQueryVariables>(GetStudentPostsDocument, options);
        }
export type GetStudentPostsQueryHookResult = ReturnType<typeof useGetStudentPostsQuery>;
export type GetStudentPostsLazyQueryHookResult = ReturnType<typeof useGetStudentPostsLazyQuery>;
export type GetStudentPostsQueryResult = Apollo.QueryResult<GetStudentPostsQuery, GetStudentPostsQueryVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($data: UpdatePostInput!) {
  updatePost(data: $data) {
    id
    text
    color
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreateStudentDocument = gql`
    mutation CreateStudent($data: CreateStudentInput!) {
  createStudent(data: $data) {
    id
    name
    email
  }
}
    `;
export type CreateStudentMutationFn = Apollo.MutationFunction<CreateStudentMutation, CreateStudentMutationVariables>;

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStudentMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, options);
      }
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>;
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>;
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<CreateStudentMutation, CreateStudentMutationVariables>;
export const DeleteStudentByIdDocument = gql`
    mutation deleteStudentById($id: Int!) {
  deleteStudent(id: $id) {
    id
    email
    name
  }
}
    `;
export type DeleteStudentByIdMutationFn = Apollo.MutationFunction<DeleteStudentByIdMutation, DeleteStudentByIdMutationVariables>;

/**
 * __useDeleteStudentByIdMutation__
 *
 * To run a mutation, you first call `useDeleteStudentByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentByIdMutation, { data, loading, error }] = useDeleteStudentByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStudentByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudentByIdMutation, DeleteStudentByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudentByIdMutation, DeleteStudentByIdMutationVariables>(DeleteStudentByIdDocument, options);
      }
export type DeleteStudentByIdMutationHookResult = ReturnType<typeof useDeleteStudentByIdMutation>;
export type DeleteStudentByIdMutationResult = Apollo.MutationResult<DeleteStudentByIdMutation>;
export type DeleteStudentByIdMutationOptions = Apollo.BaseMutationOptions<DeleteStudentByIdMutation, DeleteStudentByIdMutationVariables>;
export const GetSendedMessagesToDocument = gql`
    query getSendedMessagesTo($data: GetStudentInput!, $receiverId: Int!) {
  student(data: $data) {
    sendedMessagesTo(toId: $receiverId) {
      id
      title
      sendTime
      receiverStudentId
      senderStudentId
    }
  }
}
    `;

/**
 * __useGetSendedMessagesToQuery__
 *
 * To run a query within a React component, call `useGetSendedMessagesToQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSendedMessagesToQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSendedMessagesToQuery({
 *   variables: {
 *      data: // value for 'data'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useGetSendedMessagesToQuery(baseOptions: Apollo.QueryHookOptions<GetSendedMessagesToQuery, GetSendedMessagesToQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSendedMessagesToQuery, GetSendedMessagesToQueryVariables>(GetSendedMessagesToDocument, options);
      }
export function useGetSendedMessagesToLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSendedMessagesToQuery, GetSendedMessagesToQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSendedMessagesToQuery, GetSendedMessagesToQueryVariables>(GetSendedMessagesToDocument, options);
        }
export type GetSendedMessagesToQueryHookResult = ReturnType<typeof useGetSendedMessagesToQuery>;
export type GetSendedMessagesToLazyQueryHookResult = ReturnType<typeof useGetSendedMessagesToLazyQuery>;
export type GetSendedMessagesToQueryResult = Apollo.QueryResult<GetSendedMessagesToQuery, GetSendedMessagesToQueryVariables>;
export const GetStudentWithoutPostsDocument = gql`
    query getStudentWithoutPosts($data: GetStudentInput!) {
  student(data: $data) {
    id
    email
    name
  }
}
    `;

/**
 * __useGetStudentWithoutPostsQuery__
 *
 * To run a query within a React component, call `useGetStudentWithoutPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentWithoutPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentWithoutPostsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetStudentWithoutPostsQuery(baseOptions: Apollo.QueryHookOptions<GetStudentWithoutPostsQuery, GetStudentWithoutPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentWithoutPostsQuery, GetStudentWithoutPostsQueryVariables>(GetStudentWithoutPostsDocument, options);
      }
export function useGetStudentWithoutPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentWithoutPostsQuery, GetStudentWithoutPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentWithoutPostsQuery, GetStudentWithoutPostsQueryVariables>(GetStudentWithoutPostsDocument, options);
        }
export type GetStudentWithoutPostsQueryHookResult = ReturnType<typeof useGetStudentWithoutPostsQuery>;
export type GetStudentWithoutPostsLazyQueryHookResult = ReturnType<typeof useGetStudentWithoutPostsLazyQuery>;
export type GetStudentWithoutPostsQueryResult = Apollo.QueryResult<GetStudentWithoutPostsQuery, GetStudentWithoutPostsQueryVariables>;
export const GetStudentsWithoutPostsDocument = gql`
    query getStudentsWithoutPosts($offset: Int, $limit: Int) {
  students(offset: $offset, limit: $limit) {
    id
    email
    name
  }
}
    `;

/**
 * __useGetStudentsWithoutPostsQuery__
 *
 * To run a query within a React component, call `useGetStudentsWithoutPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentsWithoutPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentsWithoutPostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetStudentsWithoutPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetStudentsWithoutPostsQuery, GetStudentsWithoutPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentsWithoutPostsQuery, GetStudentsWithoutPostsQueryVariables>(GetStudentsWithoutPostsDocument, options);
      }
export function useGetStudentsWithoutPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentsWithoutPostsQuery, GetStudentsWithoutPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentsWithoutPostsQuery, GetStudentsWithoutPostsQueryVariables>(GetStudentsWithoutPostsDocument, options);
        }
export type GetStudentsWithoutPostsQueryHookResult = ReturnType<typeof useGetStudentsWithoutPostsQuery>;
export type GetStudentsWithoutPostsLazyQueryHookResult = ReturnType<typeof useGetStudentsWithoutPostsLazyQuery>;
export type GetStudentsWithoutPostsQueryResult = Apollo.QueryResult<GetStudentsWithoutPostsQuery, GetStudentsWithoutPostsQueryVariables>;