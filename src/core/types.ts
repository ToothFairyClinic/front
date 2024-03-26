import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

export type AdminGetMeOutput = {
  __typename?: 'AdminGetMeOutput';
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AdminRegisterInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AdminRegisterOutput = {
  __typename?: 'AdminRegisterOutput';
  accessToken: Scalars['String']['output'];
};

export type CloudinarySignatureOutput = {
  __typename?: 'CloudinarySignatureOutput';
  apiKey: Scalars['String']['output'];
  cloudName: Scalars['String']['output'];
  publicId: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "admin" */
export type Admin = {
  __typename?: 'admin';
  id: Scalars['uuid']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AdminLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AdminLoginOutput = {
  __typename?: 'adminLoginOutput';
  accessToken: Scalars['String']['output'];
};

/** aggregated selection of "admin" */
export type Admin_Aggregate = {
  __typename?: 'admin_aggregate';
  aggregate?: Maybe<Admin_Aggregate_Fields>;
  nodes: Array<Admin>;
};

/** aggregate fields of "admin" */
export type Admin_Aggregate_Fields = {
  __typename?: 'admin_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Admin_Max_Fields>;
  min?: Maybe<Admin_Min_Fields>;
};


/** aggregate fields of "admin" */
export type Admin_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Admin_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "admin". All fields are combined with a logical 'AND'. */
export type Admin_Bool_Exp = {
  _and?: InputMaybe<Array<Admin_Bool_Exp>>;
  _not?: InputMaybe<Admin_Bool_Exp>;
  _or?: InputMaybe<Array<Admin_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "admin" */
export enum Admin_Constraint {
  /** unique or primary key constraint on columns "id" */
  AdminPkey = 'admin_pkey',
  /** unique or primary key constraint on columns "username" */
  AdminUsernameKey = 'admin_username_key'
}

/** input type for inserting data into table "admin" */
export type Admin_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Admin_Max_Fields = {
  __typename?: 'admin_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Admin_Min_Fields = {
  __typename?: 'admin_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "admin" */
export type Admin_Mutation_Response = {
  __typename?: 'admin_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Admin>;
};

/** on_conflict condition type for table "admin" */
export type Admin_On_Conflict = {
  constraint: Admin_Constraint;
  update_columns?: Array<Admin_Update_Column>;
  where?: InputMaybe<Admin_Bool_Exp>;
};

/** Ordering options when selecting data from "admin". */
export type Admin_Order_By = {
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: admin */
export type Admin_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "admin" */
export enum Admin_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "admin" */
export type Admin_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "admin" */
export type Admin_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Admin_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Admin_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "admin" */
export enum Admin_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Username = 'username'
}

export type Admin_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Admin_Set_Input>;
  /** filter the rows which have to be updated */
  where: Admin_Bool_Exp;
};

/** columns and relationships of "advantages" */
export type Advantages = {
  __typename?: 'advantages';
  id: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
};

/** aggregated selection of "advantages" */
export type Advantages_Aggregate = {
  __typename?: 'advantages_aggregate';
  aggregate?: Maybe<Advantages_Aggregate_Fields>;
  nodes: Array<Advantages>;
};

/** aggregate fields of "advantages" */
export type Advantages_Aggregate_Fields = {
  __typename?: 'advantages_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Advantages_Max_Fields>;
  min?: Maybe<Advantages_Min_Fields>;
};


/** aggregate fields of "advantages" */
export type Advantages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Advantages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "advantages". All fields are combined with a logical 'AND'. */
export type Advantages_Bool_Exp = {
  _and?: InputMaybe<Array<Advantages_Bool_Exp>>;
  _not?: InputMaybe<Advantages_Bool_Exp>;
  _or?: InputMaybe<Array<Advantages_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "advantages" */
export enum Advantages_Constraint {
  /** unique or primary key constraint on columns "id" */
  AdvantagesPkey = 'advantages_pkey'
}

/** input type for inserting data into table "advantages" */
export type Advantages_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Advantages_Max_Fields = {
  __typename?: 'advantages_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Advantages_Min_Fields = {
  __typename?: 'advantages_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "advantages" */
export type Advantages_Mutation_Response = {
  __typename?: 'advantages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Advantages>;
};

/** on_conflict condition type for table "advantages" */
export type Advantages_On_Conflict = {
  constraint: Advantages_Constraint;
  update_columns?: Array<Advantages_Update_Column>;
  where?: InputMaybe<Advantages_Bool_Exp>;
};

/** Ordering options when selecting data from "advantages". */
export type Advantages_Order_By = {
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: advantages */
export type Advantages_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "advantages" */
export enum Advantages_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "advantages" */
export type Advantages_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "advantages" */
export type Advantages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Advantages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Advantages_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "advantages" */
export enum Advantages_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title'
}

export type Advantages_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Advantages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Advantages_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  adminRegister?: Maybe<AdminRegisterOutput>;
  /** delete data from the table: "admin" */
  delete_admin?: Maybe<Admin_Mutation_Response>;
  /** delete single row from the table: "admin" */
  delete_admin_by_pk?: Maybe<Admin>;
  /** delete data from the table: "advantages" */
  delete_advantages?: Maybe<Advantages_Mutation_Response>;
  /** delete single row from the table: "advantages" */
  delete_advantages_by_pk?: Maybe<Advantages>;
  /** delete data from the table: "personnel" */
  delete_personnel?: Maybe<Personnel_Mutation_Response>;
  /** delete single row from the table: "personnel" */
  delete_personnel_by_pk?: Maybe<Personnel>;
  /** delete data from the table: "personnel_categories" */
  delete_personnel_categories?: Maybe<Personnel_Categories_Mutation_Response>;
  /** delete single row from the table: "personnel_categories" */
  delete_personnel_categories_by_pk?: Maybe<Personnel_Categories>;
  /** delete data from the table: "price_list" */
  delete_price_list?: Maybe<Price_List_Mutation_Response>;
  /** delete single row from the table: "price_list" */
  delete_price_list_by_pk?: Maybe<Price_List>;
  /** delete data from the table: "price_list_categories" */
  delete_price_list_categories?: Maybe<Price_List_Categories_Mutation_Response>;
  /** delete single row from the table: "price_list_categories" */
  delete_price_list_categories_by_pk?: Maybe<Price_List_Categories>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "products_categories" */
  delete_products_categories?: Maybe<Products_Categories_Mutation_Response>;
  /** delete single row from the table: "products_categories" */
  delete_products_categories_by_pk?: Maybe<Products_Categories>;
  /** delete data from the table: "reviews" */
  delete_reviews?: Maybe<Reviews_Mutation_Response>;
  /** delete single row from the table: "reviews" */
  delete_reviews_by_pk?: Maybe<Reviews>;
  /** delete data from the table: "services" */
  delete_services?: Maybe<Services_Mutation_Response>;
  /** delete single row from the table: "services" */
  delete_services_by_pk?: Maybe<Services>;
  /** insert data into the table: "admin" */
  insert_admin?: Maybe<Admin_Mutation_Response>;
  /** insert a single row into the table: "admin" */
  insert_admin_one?: Maybe<Admin>;
  /** insert data into the table: "advantages" */
  insert_advantages?: Maybe<Advantages_Mutation_Response>;
  /** insert a single row into the table: "advantages" */
  insert_advantages_one?: Maybe<Advantages>;
  /** insert data into the table: "personnel" */
  insert_personnel?: Maybe<Personnel_Mutation_Response>;
  /** insert data into the table: "personnel_categories" */
  insert_personnel_categories?: Maybe<Personnel_Categories_Mutation_Response>;
  /** insert a single row into the table: "personnel_categories" */
  insert_personnel_categories_one?: Maybe<Personnel_Categories>;
  /** insert a single row into the table: "personnel" */
  insert_personnel_one?: Maybe<Personnel>;
  /** insert data into the table: "price_list" */
  insert_price_list?: Maybe<Price_List_Mutation_Response>;
  /** insert data into the table: "price_list_categories" */
  insert_price_list_categories?: Maybe<Price_List_Categories_Mutation_Response>;
  /** insert a single row into the table: "price_list_categories" */
  insert_price_list_categories_one?: Maybe<Price_List_Categories>;
  /** insert a single row into the table: "price_list" */
  insert_price_list_one?: Maybe<Price_List>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert data into the table: "products_categories" */
  insert_products_categories?: Maybe<Products_Categories_Mutation_Response>;
  /** insert a single row into the table: "products_categories" */
  insert_products_categories_one?: Maybe<Products_Categories>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "reviews" */
  insert_reviews?: Maybe<Reviews_Mutation_Response>;
  /** insert a single row into the table: "reviews" */
  insert_reviews_one?: Maybe<Reviews>;
  /** insert data into the table: "services" */
  insert_services?: Maybe<Services_Mutation_Response>;
  /** insert a single row into the table: "services" */
  insert_services_one?: Maybe<Services>;
  /** update data of the table: "admin" */
  update_admin?: Maybe<Admin_Mutation_Response>;
  /** update single row of the table: "admin" */
  update_admin_by_pk?: Maybe<Admin>;
  /** update multiples rows of table: "admin" */
  update_admin_many?: Maybe<Array<Maybe<Admin_Mutation_Response>>>;
  /** update data of the table: "advantages" */
  update_advantages?: Maybe<Advantages_Mutation_Response>;
  /** update single row of the table: "advantages" */
  update_advantages_by_pk?: Maybe<Advantages>;
  /** update multiples rows of table: "advantages" */
  update_advantages_many?: Maybe<Array<Maybe<Advantages_Mutation_Response>>>;
  /** update data of the table: "personnel" */
  update_personnel?: Maybe<Personnel_Mutation_Response>;
  /** update single row of the table: "personnel" */
  update_personnel_by_pk?: Maybe<Personnel>;
  /** update data of the table: "personnel_categories" */
  update_personnel_categories?: Maybe<Personnel_Categories_Mutation_Response>;
  /** update single row of the table: "personnel_categories" */
  update_personnel_categories_by_pk?: Maybe<Personnel_Categories>;
  /** update multiples rows of table: "personnel_categories" */
  update_personnel_categories_many?: Maybe<Array<Maybe<Personnel_Categories_Mutation_Response>>>;
  /** update multiples rows of table: "personnel" */
  update_personnel_many?: Maybe<Array<Maybe<Personnel_Mutation_Response>>>;
  /** update data of the table: "price_list" */
  update_price_list?: Maybe<Price_List_Mutation_Response>;
  /** update single row of the table: "price_list" */
  update_price_list_by_pk?: Maybe<Price_List>;
  /** update data of the table: "price_list_categories" */
  update_price_list_categories?: Maybe<Price_List_Categories_Mutation_Response>;
  /** update single row of the table: "price_list_categories" */
  update_price_list_categories_by_pk?: Maybe<Price_List_Categories>;
  /** update multiples rows of table: "price_list_categories" */
  update_price_list_categories_many?: Maybe<Array<Maybe<Price_List_Categories_Mutation_Response>>>;
  /** update multiples rows of table: "price_list" */
  update_price_list_many?: Maybe<Array<Maybe<Price_List_Mutation_Response>>>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update data of the table: "products_categories" */
  update_products_categories?: Maybe<Products_Categories_Mutation_Response>;
  /** update single row of the table: "products_categories" */
  update_products_categories_by_pk?: Maybe<Products_Categories>;
  /** update multiples rows of table: "products_categories" */
  update_products_categories_many?: Maybe<Array<Maybe<Products_Categories_Mutation_Response>>>;
  /** update multiples rows of table: "products" */
  update_products_many?: Maybe<Array<Maybe<Products_Mutation_Response>>>;
  /** update data of the table: "reviews" */
  update_reviews?: Maybe<Reviews_Mutation_Response>;
  /** update single row of the table: "reviews" */
  update_reviews_by_pk?: Maybe<Reviews>;
  /** update multiples rows of table: "reviews" */
  update_reviews_many?: Maybe<Array<Maybe<Reviews_Mutation_Response>>>;
  /** update data of the table: "services" */
  update_services?: Maybe<Services_Mutation_Response>;
  /** update single row of the table: "services" */
  update_services_by_pk?: Maybe<Services>;
  /** update multiples rows of table: "services" */
  update_services_many?: Maybe<Array<Maybe<Services_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootAdminRegisterArgs = {
  admin: AdminRegisterInput;
};


/** mutation root */
export type Mutation_RootDelete_AdminArgs = {
  where: Admin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Admin_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_AdvantagesArgs = {
  where: Advantages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Advantages_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PersonnelArgs = {
  where: Personnel_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Personnel_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Personnel_CategoriesArgs = {
  where: Personnel_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Personnel_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Price_ListArgs = {
  where: Price_List_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Price_List_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Price_List_CategoriesArgs = {
  where: Price_List_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Price_List_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Products_CategoriesArgs = {
  where: Products_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ReviewsArgs = {
  where: Reviews_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Reviews_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ServicesArgs = {
  where: Services_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Services_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_AdminArgs = {
  objects: Array<Admin_Insert_Input>;
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Admin_OneArgs = {
  object: Admin_Insert_Input;
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AdvantagesArgs = {
  objects: Array<Advantages_Insert_Input>;
  on_conflict?: InputMaybe<Advantages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Advantages_OneArgs = {
  object: Advantages_Insert_Input;
  on_conflict?: InputMaybe<Advantages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PersonnelArgs = {
  objects: Array<Personnel_Insert_Input>;
  on_conflict?: InputMaybe<Personnel_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Personnel_CategoriesArgs = {
  objects: Array<Personnel_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Personnel_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Personnel_Categories_OneArgs = {
  object: Personnel_Categories_Insert_Input;
  on_conflict?: InputMaybe<Personnel_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Personnel_OneArgs = {
  object: Personnel_Insert_Input;
  on_conflict?: InputMaybe<Personnel_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Price_ListArgs = {
  objects: Array<Price_List_Insert_Input>;
  on_conflict?: InputMaybe<Price_List_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Price_List_CategoriesArgs = {
  objects: Array<Price_List_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Price_List_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Price_List_Categories_OneArgs = {
  object: Price_List_Categories_Insert_Input;
  on_conflict?: InputMaybe<Price_List_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Price_List_OneArgs = {
  object: Price_List_Insert_Input;
  on_conflict?: InputMaybe<Price_List_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_CategoriesArgs = {
  objects: Array<Products_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Products_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_Categories_OneArgs = {
  object: Products_Categories_Insert_Input;
  on_conflict?: InputMaybe<Products_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ReviewsArgs = {
  objects: Array<Reviews_Insert_Input>;
  on_conflict?: InputMaybe<Reviews_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Reviews_OneArgs = {
  object: Reviews_Insert_Input;
  on_conflict?: InputMaybe<Reviews_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ServicesArgs = {
  objects: Array<Services_Insert_Input>;
  on_conflict?: InputMaybe<Services_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Services_OneArgs = {
  object: Services_Insert_Input;
  on_conflict?: InputMaybe<Services_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AdminArgs = {
  _set?: InputMaybe<Admin_Set_Input>;
  where: Admin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Admin_By_PkArgs = {
  _set?: InputMaybe<Admin_Set_Input>;
  pk_columns: Admin_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Admin_ManyArgs = {
  updates: Array<Admin_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AdvantagesArgs = {
  _set?: InputMaybe<Advantages_Set_Input>;
  where: Advantages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Advantages_By_PkArgs = {
  _set?: InputMaybe<Advantages_Set_Input>;
  pk_columns: Advantages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Advantages_ManyArgs = {
  updates: Array<Advantages_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PersonnelArgs = {
  _set?: InputMaybe<Personnel_Set_Input>;
  where: Personnel_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Personnel_By_PkArgs = {
  _set?: InputMaybe<Personnel_Set_Input>;
  pk_columns: Personnel_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Personnel_CategoriesArgs = {
  _set?: InputMaybe<Personnel_Categories_Set_Input>;
  where: Personnel_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Personnel_Categories_By_PkArgs = {
  _set?: InputMaybe<Personnel_Categories_Set_Input>;
  pk_columns: Personnel_Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Personnel_Categories_ManyArgs = {
  updates: Array<Personnel_Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Personnel_ManyArgs = {
  updates: Array<Personnel_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Price_ListArgs = {
  _inc?: InputMaybe<Price_List_Inc_Input>;
  _set?: InputMaybe<Price_List_Set_Input>;
  where: Price_List_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Price_List_By_PkArgs = {
  _inc?: InputMaybe<Price_List_Inc_Input>;
  _set?: InputMaybe<Price_List_Set_Input>;
  pk_columns: Price_List_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Price_List_CategoriesArgs = {
  _set?: InputMaybe<Price_List_Categories_Set_Input>;
  where: Price_List_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Price_List_Categories_By_PkArgs = {
  _set?: InputMaybe<Price_List_Categories_Set_Input>;
  pk_columns: Price_List_Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Price_List_Categories_ManyArgs = {
  updates: Array<Price_List_Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Price_List_ManyArgs = {
  updates: Array<Price_List_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _inc?: InputMaybe<Products_Inc_Input>;
  _set?: InputMaybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _inc?: InputMaybe<Products_Inc_Input>;
  _set?: InputMaybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Products_CategoriesArgs = {
  _set?: InputMaybe<Products_Categories_Set_Input>;
  where: Products_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_Categories_By_PkArgs = {
  _set?: InputMaybe<Products_Categories_Set_Input>;
  pk_columns: Products_Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Products_Categories_ManyArgs = {
  updates: Array<Products_Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Products_ManyArgs = {
  updates: Array<Products_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ReviewsArgs = {
  _set?: InputMaybe<Reviews_Set_Input>;
  where: Reviews_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Reviews_By_PkArgs = {
  _set?: InputMaybe<Reviews_Set_Input>;
  pk_columns: Reviews_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Reviews_ManyArgs = {
  updates: Array<Reviews_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ServicesArgs = {
  _set?: InputMaybe<Services_Set_Input>;
  where: Services_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Services_By_PkArgs = {
  _set?: InputMaybe<Services_Set_Input>;
  pk_columns: Services_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Services_ManyArgs = {
  updates: Array<Services_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "personnel" */
export type Personnel = {
  __typename?: 'personnel';
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  personnel_category?: Maybe<Personnel_Categories>;
  personnel_category_id: Scalars['uuid']['output'];
  personnel_category_id_second?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  personnel_category_second?: Maybe<Personnel_Categories>;
};

/** aggregated selection of "personnel" */
export type Personnel_Aggregate = {
  __typename?: 'personnel_aggregate';
  aggregate?: Maybe<Personnel_Aggregate_Fields>;
  nodes: Array<Personnel>;
};

export type Personnel_Aggregate_Bool_Exp = {
  count?: InputMaybe<Personnel_Aggregate_Bool_Exp_Count>;
};

export type Personnel_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Personnel_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Personnel_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "personnel" */
export type Personnel_Aggregate_Fields = {
  __typename?: 'personnel_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Personnel_Max_Fields>;
  min?: Maybe<Personnel_Min_Fields>;
};


/** aggregate fields of "personnel" */
export type Personnel_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Personnel_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "personnel" */
export type Personnel_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Personnel_Max_Order_By>;
  min?: InputMaybe<Personnel_Min_Order_By>;
};

/** input type for inserting array relation for remote table "personnel" */
export type Personnel_Arr_Rel_Insert_Input = {
  data: Array<Personnel_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Personnel_On_Conflict>;
};

/** Boolean expression to filter rows from the table "personnel". All fields are combined with a logical 'AND'. */
export type Personnel_Bool_Exp = {
  _and?: InputMaybe<Array<Personnel_Bool_Exp>>;
  _not?: InputMaybe<Personnel_Bool_Exp>;
  _or?: InputMaybe<Array<Personnel_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  personnel_category?: InputMaybe<Personnel_Categories_Bool_Exp>;
  personnel_category_id?: InputMaybe<Uuid_Comparison_Exp>;
  personnel_category_id_second?: InputMaybe<Uuid_Comparison_Exp>;
  personnel_category_second?: InputMaybe<Personnel_Categories_Bool_Exp>;
};

/** columns and relationships of "personnel_categories" */
export type Personnel_Categories = {
  __typename?: 'personnel_categories';
  id: Scalars['uuid']['output'];
  /** An array relationship */
  personnel_items: Array<Personnel>;
  /** An aggregate relationship */
  personnel_items_aggregate: Personnel_Aggregate;
  /** An array relationship */
  personnel_items_second: Array<Personnel>;
  /** An aggregate relationship */
  personnel_items_second_aggregate: Personnel_Aggregate;
  slug?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};


/** columns and relationships of "personnel_categories" */
export type Personnel_CategoriesPersonnel_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


/** columns and relationships of "personnel_categories" */
export type Personnel_CategoriesPersonnel_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


/** columns and relationships of "personnel_categories" */
export type Personnel_CategoriesPersonnel_Items_SecondArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


/** columns and relationships of "personnel_categories" */
export type Personnel_CategoriesPersonnel_Items_Second_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};

/** aggregated selection of "personnel_categories" */
export type Personnel_Categories_Aggregate = {
  __typename?: 'personnel_categories_aggregate';
  aggregate?: Maybe<Personnel_Categories_Aggregate_Fields>;
  nodes: Array<Personnel_Categories>;
};

/** aggregate fields of "personnel_categories" */
export type Personnel_Categories_Aggregate_Fields = {
  __typename?: 'personnel_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Personnel_Categories_Max_Fields>;
  min?: Maybe<Personnel_Categories_Min_Fields>;
};


/** aggregate fields of "personnel_categories" */
export type Personnel_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Personnel_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "personnel_categories". All fields are combined with a logical 'AND'. */
export type Personnel_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Personnel_Categories_Bool_Exp>>;
  _not?: InputMaybe<Personnel_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Personnel_Categories_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  personnel_items?: InputMaybe<Personnel_Bool_Exp>;
  personnel_items_aggregate?: InputMaybe<Personnel_Aggregate_Bool_Exp>;
  personnel_items_second?: InputMaybe<Personnel_Bool_Exp>;
  personnel_items_second_aggregate?: InputMaybe<Personnel_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "personnel_categories" */
export enum Personnel_Categories_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProductsCategoriesPkey = 'products_categories_pkey'
}

/** input type for inserting data into table "personnel_categories" */
export type Personnel_Categories_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  personnel_items?: InputMaybe<Personnel_Arr_Rel_Insert_Input>;
  personnel_items_second?: InputMaybe<Personnel_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Personnel_Categories_Max_Fields = {
  __typename?: 'personnel_categories_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Personnel_Categories_Min_Fields = {
  __typename?: 'personnel_categories_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "personnel_categories" */
export type Personnel_Categories_Mutation_Response = {
  __typename?: 'personnel_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Personnel_Categories>;
};

/** input type for inserting object relation for remote table "personnel_categories" */
export type Personnel_Categories_Obj_Rel_Insert_Input = {
  data: Personnel_Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Personnel_Categories_On_Conflict>;
};

/** on_conflict condition type for table "personnel_categories" */
export type Personnel_Categories_On_Conflict = {
  constraint: Personnel_Categories_Constraint;
  update_columns?: Array<Personnel_Categories_Update_Column>;
  where?: InputMaybe<Personnel_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "personnel_categories". */
export type Personnel_Categories_Order_By = {
  id?: InputMaybe<Order_By>;
  personnel_items_aggregate?: InputMaybe<Personnel_Aggregate_Order_By>;
  personnel_items_second_aggregate?: InputMaybe<Personnel_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: personnel_categories */
export type Personnel_Categories_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "personnel_categories" */
export enum Personnel_Categories_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "personnel_categories" */
export type Personnel_Categories_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "personnel_categories" */
export type Personnel_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Personnel_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Personnel_Categories_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "personnel_categories" */
export enum Personnel_Categories_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title'
}

export type Personnel_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Personnel_Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Personnel_Categories_Bool_Exp;
};

/** unique or primary key constraints on table "personnel" */
export enum Personnel_Constraint {
  /** unique or primary key constraint on columns "id" */
  PersonnelPkey = 'personnel_pkey'
}

/** input type for inserting data into table "personnel" */
export type Personnel_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  personnel_category?: InputMaybe<Personnel_Categories_Obj_Rel_Insert_Input>;
  personnel_category_id?: InputMaybe<Scalars['uuid']['input']>;
  personnel_category_id_second?: InputMaybe<Scalars['uuid']['input']>;
  personnel_category_second?: InputMaybe<Personnel_Categories_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Personnel_Max_Fields = {
  __typename?: 'personnel_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  personnel_category_id?: Maybe<Scalars['uuid']['output']>;
  personnel_category_id_second?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "personnel" */
export type Personnel_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  personnel_category_id?: InputMaybe<Order_By>;
  personnel_category_id_second?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Personnel_Min_Fields = {
  __typename?: 'personnel_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  personnel_category_id?: Maybe<Scalars['uuid']['output']>;
  personnel_category_id_second?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "personnel" */
export type Personnel_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  personnel_category_id?: InputMaybe<Order_By>;
  personnel_category_id_second?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "personnel" */
export type Personnel_Mutation_Response = {
  __typename?: 'personnel_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Personnel>;
};

/** on_conflict condition type for table "personnel" */
export type Personnel_On_Conflict = {
  constraint: Personnel_Constraint;
  update_columns?: Array<Personnel_Update_Column>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};

/** Ordering options when selecting data from "personnel". */
export type Personnel_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  personnel_category?: InputMaybe<Personnel_Categories_Order_By>;
  personnel_category_id?: InputMaybe<Order_By>;
  personnel_category_id_second?: InputMaybe<Order_By>;
  personnel_category_second?: InputMaybe<Personnel_Categories_Order_By>;
};

/** primary key columns input for table: personnel */
export type Personnel_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "personnel" */
export enum Personnel_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  PersonnelCategoryId = 'personnel_category_id',
  /** column name */
  PersonnelCategoryIdSecond = 'personnel_category_id_second'
}

/** input type for updating data in table "personnel" */
export type Personnel_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  personnel_category_id?: InputMaybe<Scalars['uuid']['input']>;
  personnel_category_id_second?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "personnel" */
export type Personnel_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Personnel_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Personnel_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  personnel_category_id?: InputMaybe<Scalars['uuid']['input']>;
  personnel_category_id_second?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "personnel" */
export enum Personnel_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  PersonnelCategoryId = 'personnel_category_id',
  /** column name */
  PersonnelCategoryIdSecond = 'personnel_category_id_second'
}

export type Personnel_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Personnel_Set_Input>;
  /** filter the rows which have to be updated */
  where: Personnel_Bool_Exp;
};

/** columns and relationships of "price_list" */
export type Price_List = {
  __typename?: 'price_list';
  id: Scalars['uuid']['output'];
  price: Scalars['numeric']['output'];
  /** An object relationship */
  price_list_category?: Maybe<Price_List_Categories>;
  price_list_category_id: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
};

/** aggregated selection of "price_list" */
export type Price_List_Aggregate = {
  __typename?: 'price_list_aggregate';
  aggregate?: Maybe<Price_List_Aggregate_Fields>;
  nodes: Array<Price_List>;
};

export type Price_List_Aggregate_Bool_Exp = {
  count?: InputMaybe<Price_List_Aggregate_Bool_Exp_Count>;
};

export type Price_List_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Price_List_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Price_List_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "price_list" */
export type Price_List_Aggregate_Fields = {
  __typename?: 'price_list_aggregate_fields';
  avg?: Maybe<Price_List_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Price_List_Max_Fields>;
  min?: Maybe<Price_List_Min_Fields>;
  stddev?: Maybe<Price_List_Stddev_Fields>;
  stddev_pop?: Maybe<Price_List_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Price_List_Stddev_Samp_Fields>;
  sum?: Maybe<Price_List_Sum_Fields>;
  var_pop?: Maybe<Price_List_Var_Pop_Fields>;
  var_samp?: Maybe<Price_List_Var_Samp_Fields>;
  variance?: Maybe<Price_List_Variance_Fields>;
};


/** aggregate fields of "price_list" */
export type Price_List_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Price_List_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "price_list" */
export type Price_List_Aggregate_Order_By = {
  avg?: InputMaybe<Price_List_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Price_List_Max_Order_By>;
  min?: InputMaybe<Price_List_Min_Order_By>;
  stddev?: InputMaybe<Price_List_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Price_List_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Price_List_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Price_List_Sum_Order_By>;
  var_pop?: InputMaybe<Price_List_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Price_List_Var_Samp_Order_By>;
  variance?: InputMaybe<Price_List_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "price_list" */
export type Price_List_Arr_Rel_Insert_Input = {
  data: Array<Price_List_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Price_List_On_Conflict>;
};

/** aggregate avg on columns */
export type Price_List_Avg_Fields = {
  __typename?: 'price_list_avg_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "price_list" */
export type Price_List_Avg_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "price_list". All fields are combined with a logical 'AND'. */
export type Price_List_Bool_Exp = {
  _and?: InputMaybe<Array<Price_List_Bool_Exp>>;
  _not?: InputMaybe<Price_List_Bool_Exp>;
  _or?: InputMaybe<Array<Price_List_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  price_list_category?: InputMaybe<Price_List_Categories_Bool_Exp>;
  price_list_category_id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "price_list_categories" */
export type Price_List_Categories = {
  __typename?: 'price_list_categories';
  id: Scalars['uuid']['output'];
  /** An array relationship */
  price_list_items: Array<Price_List>;
  /** An aggregate relationship */
  price_list_items_aggregate: Price_List_Aggregate;
  slug?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};


/** columns and relationships of "price_list_categories" */
export type Price_List_CategoriesPrice_List_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Order_By>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};


/** columns and relationships of "price_list_categories" */
export type Price_List_CategoriesPrice_List_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Order_By>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};

/** aggregated selection of "price_list_categories" */
export type Price_List_Categories_Aggregate = {
  __typename?: 'price_list_categories_aggregate';
  aggregate?: Maybe<Price_List_Categories_Aggregate_Fields>;
  nodes: Array<Price_List_Categories>;
};

/** aggregate fields of "price_list_categories" */
export type Price_List_Categories_Aggregate_Fields = {
  __typename?: 'price_list_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Price_List_Categories_Max_Fields>;
  min?: Maybe<Price_List_Categories_Min_Fields>;
};


/** aggregate fields of "price_list_categories" */
export type Price_List_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Price_List_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "price_list_categories". All fields are combined with a logical 'AND'. */
export type Price_List_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Price_List_Categories_Bool_Exp>>;
  _not?: InputMaybe<Price_List_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Price_List_Categories_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  price_list_items?: InputMaybe<Price_List_Bool_Exp>;
  price_list_items_aggregate?: InputMaybe<Price_List_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "price_list_categories" */
export enum Price_List_Categories_Constraint {
  /** unique or primary key constraint on columns "id" */
  PriceListCategoriesPkey = 'price_list_categories_pkey'
}

/** input type for inserting data into table "price_list_categories" */
export type Price_List_Categories_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  price_list_items?: InputMaybe<Price_List_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Price_List_Categories_Max_Fields = {
  __typename?: 'price_list_categories_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Price_List_Categories_Min_Fields = {
  __typename?: 'price_list_categories_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "price_list_categories" */
export type Price_List_Categories_Mutation_Response = {
  __typename?: 'price_list_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Price_List_Categories>;
};

/** input type for inserting object relation for remote table "price_list_categories" */
export type Price_List_Categories_Obj_Rel_Insert_Input = {
  data: Price_List_Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Price_List_Categories_On_Conflict>;
};

/** on_conflict condition type for table "price_list_categories" */
export type Price_List_Categories_On_Conflict = {
  constraint: Price_List_Categories_Constraint;
  update_columns?: Array<Price_List_Categories_Update_Column>;
  where?: InputMaybe<Price_List_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "price_list_categories". */
export type Price_List_Categories_Order_By = {
  id?: InputMaybe<Order_By>;
  price_list_items_aggregate?: InputMaybe<Price_List_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: price_list_categories */
export type Price_List_Categories_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "price_list_categories" */
export enum Price_List_Categories_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "price_list_categories" */
export type Price_List_Categories_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "price_list_categories" */
export type Price_List_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Price_List_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Price_List_Categories_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "price_list_categories" */
export enum Price_List_Categories_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title'
}

export type Price_List_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Price_List_Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Price_List_Categories_Bool_Exp;
};

/** unique or primary key constraints on table "price_list" */
export enum Price_List_Constraint {
  /** unique or primary key constraint on columns "id" */
  PriceListPkey = 'price_list_pkey'
}

/** input type for incrementing numeric columns in table "price_list" */
export type Price_List_Inc_Input = {
  price?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "price_list" */
export type Price_List_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  price_list_category?: InputMaybe<Price_List_Categories_Obj_Rel_Insert_Input>;
  price_list_category_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Price_List_Max_Fields = {
  __typename?: 'price_list_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  price_list_category_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "price_list" */
export type Price_List_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  price_list_category_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Price_List_Min_Fields = {
  __typename?: 'price_list_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  price_list_category_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "price_list" */
export type Price_List_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  price_list_category_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "price_list" */
export type Price_List_Mutation_Response = {
  __typename?: 'price_list_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Price_List>;
};

/** on_conflict condition type for table "price_list" */
export type Price_List_On_Conflict = {
  constraint: Price_List_Constraint;
  update_columns?: Array<Price_List_Update_Column>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};

/** Ordering options when selecting data from "price_list". */
export type Price_List_Order_By = {
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  price_list_category?: InputMaybe<Price_List_Categories_Order_By>;
  price_list_category_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: price_list */
export type Price_List_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "price_list" */
export enum Price_List_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Price = 'price',
  /** column name */
  PriceListCategoryId = 'price_list_category_id',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "price_list" */
export type Price_List_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  price_list_category_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Price_List_Stddev_Fields = {
  __typename?: 'price_list_stddev_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "price_list" */
export type Price_List_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Price_List_Stddev_Pop_Fields = {
  __typename?: 'price_list_stddev_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "price_list" */
export type Price_List_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Price_List_Stddev_Samp_Fields = {
  __typename?: 'price_list_stddev_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "price_list" */
export type Price_List_Stddev_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "price_list" */
export type Price_List_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Price_List_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Price_List_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  price_list_category_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Price_List_Sum_Fields = {
  __typename?: 'price_list_sum_fields';
  price?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "price_list" */
export type Price_List_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** update columns of table "price_list" */
export enum Price_List_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Price = 'price',
  /** column name */
  PriceListCategoryId = 'price_list_category_id',
  /** column name */
  Title = 'title'
}

export type Price_List_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Price_List_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Price_List_Set_Input>;
  /** filter the rows which have to be updated */
  where: Price_List_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Price_List_Var_Pop_Fields = {
  __typename?: 'price_list_var_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "price_list" */
export type Price_List_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Price_List_Var_Samp_Fields = {
  __typename?: 'price_list_var_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "price_list" */
export type Price_List_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Price_List_Variance_Fields = {
  __typename?: 'price_list_variance_fields';
  price?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "price_list" */
export type Price_List_Variance_Order_By = {
  price?: InputMaybe<Order_By>;
};

/** columns and relationships of "products" */
export type Products = {
  __typename?: 'products';
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image: Scalars['String']['output'];
  price: Scalars['numeric']['output'];
  /** An object relationship */
  products_category?: Maybe<Products_Categories>;
  products_category_id?: Maybe<Scalars['uuid']['output']>;
  title: Scalars['String']['output'];
  weight: Scalars['numeric']['output'];
};

/** aggregated selection of "products" */
export type Products_Aggregate = {
  __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

export type Products_Aggregate_Bool_Exp = {
  count?: InputMaybe<Products_Aggregate_Bool_Exp_Count>;
};

export type Products_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Products_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Products_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "products" */
export type Products_Aggregate_Fields = {
  __typename?: 'products_aggregate_fields';
  avg?: Maybe<Products_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
  stddev?: Maybe<Products_Stddev_Fields>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Fields>;
  sum?: Maybe<Products_Sum_Fields>;
  var_pop?: Maybe<Products_Var_Pop_Fields>;
  var_samp?: Maybe<Products_Var_Samp_Fields>;
  variance?: Maybe<Products_Variance_Fields>;
};


/** aggregate fields of "products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Products_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "products" */
export type Products_Aggregate_Order_By = {
  avg?: InputMaybe<Products_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Products_Max_Order_By>;
  min?: InputMaybe<Products_Min_Order_By>;
  stddev?: InputMaybe<Products_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Products_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Products_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Products_Sum_Order_By>;
  var_pop?: InputMaybe<Products_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Products_Var_Samp_Order_By>;
  variance?: InputMaybe<Products_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "products" */
export type Products_Arr_Rel_Insert_Input = {
  data: Array<Products_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** aggregate avg on columns */
export type Products_Avg_Fields = {
  __typename?: 'products_avg_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "products" */
export type Products_Avg_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Bool_Exp>>;
  _not?: InputMaybe<Products_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  products_category?: InputMaybe<Products_Categories_Bool_Exp>;
  products_category_id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  weight?: InputMaybe<Numeric_Comparison_Exp>;
};

/** columns and relationships of "products_categories" */
export type Products_Categories = {
  __typename?: 'products_categories';
  id: Scalars['uuid']['output'];
  /** An array relationship */
  products_items: Array<Products>;
  /** An aggregate relationship */
  products_items_aggregate: Products_Aggregate;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


/** columns and relationships of "products_categories" */
export type Products_CategoriesProducts_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


/** columns and relationships of "products_categories" */
export type Products_CategoriesProducts_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** aggregated selection of "products_categories" */
export type Products_Categories_Aggregate = {
  __typename?: 'products_categories_aggregate';
  aggregate?: Maybe<Products_Categories_Aggregate_Fields>;
  nodes: Array<Products_Categories>;
};

/** aggregate fields of "products_categories" */
export type Products_Categories_Aggregate_Fields = {
  __typename?: 'products_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Products_Categories_Max_Fields>;
  min?: Maybe<Products_Categories_Min_Fields>;
};


/** aggregate fields of "products_categories" */
export type Products_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Products_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "products_categories". All fields are combined with a logical 'AND'. */
export type Products_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Categories_Bool_Exp>>;
  _not?: InputMaybe<Products_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Categories_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  products_items?: InputMaybe<Products_Bool_Exp>;
  products_items_aggregate?: InputMaybe<Products_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "products_categories" */
export enum Products_Categories_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProductsCategoriesPkey1 = 'products_categories_pkey1'
}

/** input type for inserting data into table "products_categories" */
export type Products_Categories_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  products_items?: InputMaybe<Products_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Products_Categories_Max_Fields = {
  __typename?: 'products_categories_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Products_Categories_Min_Fields = {
  __typename?: 'products_categories_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "products_categories" */
export type Products_Categories_Mutation_Response = {
  __typename?: 'products_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Products_Categories>;
};

/** input type for inserting object relation for remote table "products_categories" */
export type Products_Categories_Obj_Rel_Insert_Input = {
  data: Products_Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_Categories_On_Conflict>;
};

/** on_conflict condition type for table "products_categories" */
export type Products_Categories_On_Conflict = {
  constraint: Products_Categories_Constraint;
  update_columns?: Array<Products_Categories_Update_Column>;
  where?: InputMaybe<Products_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "products_categories". */
export type Products_Categories_Order_By = {
  id?: InputMaybe<Order_By>;
  products_items_aggregate?: InputMaybe<Products_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products_categories */
export type Products_Categories_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "products_categories" */
export enum Products_Categories_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "products_categories" */
export type Products_Categories_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "products_categories" */
export type Products_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Products_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Products_Categories_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "products_categories" */
export enum Products_Categories_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title'
}

export type Products_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Products_Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Products_Categories_Bool_Exp;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProductsPkey = 'products_pkey'
}

/** input type for incrementing numeric columns in table "products" */
export type Products_Inc_Input = {
  price?: InputMaybe<Scalars['numeric']['input']>;
  weight?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  products_category?: InputMaybe<Products_Categories_Obj_Rel_Insert_Input>;
  products_category_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'products_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  products_category_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "products" */
export type Products_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  products_category_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'products_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  products_category_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "products" */
export type Products_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  products_category_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** on_conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  products_category?: InputMaybe<Products_Categories_Order_By>;
  products_category_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Price = 'price',
  /** column name */
  ProductsCategoryId = 'products_category_id',
  /** column name */
  Title = 'title',
  /** column name */
  Weight = 'weight'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  products_category_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Products_Stddev_Fields = {
  __typename?: 'products_stddev_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "products" */
export type Products_Stddev_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Products_Stddev_Pop_Fields = {
  __typename?: 'products_stddev_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "products" */
export type Products_Stddev_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Products_Stddev_Samp_Fields = {
  __typename?: 'products_stddev_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "products" */
export type Products_Stddev_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "products" */
export type Products_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Products_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Products_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  products_category_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Products_Sum_Fields = {
  __typename?: 'products_sum_fields';
  price?: Maybe<Scalars['numeric']['output']>;
  weight?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "products" */
export type Products_Sum_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Price = 'price',
  /** column name */
  ProductsCategoryId = 'products_category_id',
  /** column name */
  Title = 'title',
  /** column name */
  Weight = 'weight'
}

export type Products_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Products_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Products_Set_Input>;
  /** filter the rows which have to be updated */
  where: Products_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Products_Var_Pop_Fields = {
  __typename?: 'products_var_pop_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "products" */
export type Products_Var_Pop_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Products_Var_Samp_Fields = {
  __typename?: 'products_var_samp_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "products" */
export type Products_Var_Samp_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Products_Variance_Fields = {
  __typename?: 'products_variance_fields';
  price?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "products" */
export type Products_Variance_Order_By = {
  price?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "admin" */
  admin: Array<Admin>;
  adminGetMe?: Maybe<AdminGetMeOutput>;
  adminLogin?: Maybe<AdminLoginOutput>;
  /** fetch aggregated fields from the table: "admin" */
  admin_aggregate: Admin_Aggregate;
  /** fetch data from the table: "admin" using primary key columns */
  admin_by_pk?: Maybe<Admin>;
  /** fetch data from the table: "advantages" */
  advantages: Array<Advantages>;
  /** fetch aggregated fields from the table: "advantages" */
  advantages_aggregate: Advantages_Aggregate;
  /** fetch data from the table: "advantages" using primary key columns */
  advantages_by_pk?: Maybe<Advantages>;
  cloudinarySignature?: Maybe<CloudinarySignatureOutput>;
  /** fetch data from the table: "personnel" */
  personnel: Array<Personnel>;
  /** fetch aggregated fields from the table: "personnel" */
  personnel_aggregate: Personnel_Aggregate;
  /** fetch data from the table: "personnel" using primary key columns */
  personnel_by_pk?: Maybe<Personnel>;
  /** fetch data from the table: "personnel_categories" */
  personnel_categories: Array<Personnel_Categories>;
  /** fetch aggregated fields from the table: "personnel_categories" */
  personnel_categories_aggregate: Personnel_Categories_Aggregate;
  /** fetch data from the table: "personnel_categories" using primary key columns */
  personnel_categories_by_pk?: Maybe<Personnel_Categories>;
  /** fetch data from the table: "price_list" */
  price_list: Array<Price_List>;
  /** fetch aggregated fields from the table: "price_list" */
  price_list_aggregate: Price_List_Aggregate;
  /** fetch data from the table: "price_list" using primary key columns */
  price_list_by_pk?: Maybe<Price_List>;
  /** fetch data from the table: "price_list_categories" */
  price_list_categories: Array<Price_List_Categories>;
  /** fetch aggregated fields from the table: "price_list_categories" */
  price_list_categories_aggregate: Price_List_Categories_Aggregate;
  /** fetch data from the table: "price_list_categories" using primary key columns */
  price_list_categories_by_pk?: Maybe<Price_List_Categories>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "products_categories" */
  products_categories: Array<Products_Categories>;
  /** fetch aggregated fields from the table: "products_categories" */
  products_categories_aggregate: Products_Categories_Aggregate;
  /** fetch data from the table: "products_categories" using primary key columns */
  products_categories_by_pk?: Maybe<Products_Categories>;
  /** fetch data from the table: "reviews" */
  reviews: Array<Reviews>;
  /** fetch aggregated fields from the table: "reviews" */
  reviews_aggregate: Reviews_Aggregate;
  /** fetch data from the table: "reviews" using primary key columns */
  reviews_by_pk?: Maybe<Reviews>;
  /** fetch data from the table: "services" */
  services: Array<Services>;
  /** fetch aggregated fields from the table: "services" */
  services_aggregate: Services_Aggregate;
  /** fetch data from the table: "services" using primary key columns */
  services_by_pk?: Maybe<Services>;
};


export type Query_RootAdminArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Query_RootAdminLoginArgs = {
  admin: AdminLoginInput;
};


export type Query_RootAdmin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Query_RootAdmin_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAdvantagesArgs = {
  distinct_on?: InputMaybe<Array<Advantages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Advantages_Order_By>>;
  where?: InputMaybe<Advantages_Bool_Exp>;
};


export type Query_RootAdvantages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Advantages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Advantages_Order_By>>;
  where?: InputMaybe<Advantages_Bool_Exp>;
};


export type Query_RootAdvantages_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPersonnelArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


export type Query_RootPersonnel_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


export type Query_RootPersonnel_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPersonnel_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Categories_Order_By>>;
  where?: InputMaybe<Personnel_Categories_Bool_Exp>;
};


export type Query_RootPersonnel_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Categories_Order_By>>;
  where?: InputMaybe<Personnel_Categories_Bool_Exp>;
};


export type Query_RootPersonnel_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPrice_ListArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Order_By>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};


export type Query_RootPrice_List_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Order_By>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};


export type Query_RootPrice_List_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPrice_List_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Categories_Order_By>>;
  where?: InputMaybe<Price_List_Categories_Bool_Exp>;
};


export type Query_RootPrice_List_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Categories_Order_By>>;
  where?: InputMaybe<Price_List_Categories_Bool_Exp>;
};


export type Query_RootPrice_List_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootProducts_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Products_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Categories_Order_By>>;
  where?: InputMaybe<Products_Categories_Bool_Exp>;
};


export type Query_RootProducts_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Categories_Order_By>>;
  where?: InputMaybe<Products_Categories_Bool_Exp>;
};


export type Query_RootProducts_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootReviewsArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Query_RootReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Query_RootReviews_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootServicesArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};


export type Query_RootServices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};


export type Query_RootServices_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "reviews" */
export type Reviews = {
  __typename?: 'reviews';
  client_name: Scalars['String']['output'];
  client_phone: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
};

/** aggregated selection of "reviews" */
export type Reviews_Aggregate = {
  __typename?: 'reviews_aggregate';
  aggregate?: Maybe<Reviews_Aggregate_Fields>;
  nodes: Array<Reviews>;
};

/** aggregate fields of "reviews" */
export type Reviews_Aggregate_Fields = {
  __typename?: 'reviews_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Reviews_Max_Fields>;
  min?: Maybe<Reviews_Min_Fields>;
};


/** aggregate fields of "reviews" */
export type Reviews_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Reviews_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "reviews". All fields are combined with a logical 'AND'. */
export type Reviews_Bool_Exp = {
  _and?: InputMaybe<Array<Reviews_Bool_Exp>>;
  _not?: InputMaybe<Reviews_Bool_Exp>;
  _or?: InputMaybe<Array<Reviews_Bool_Exp>>;
  client_name?: InputMaybe<String_Comparison_Exp>;
  client_phone?: InputMaybe<String_Comparison_Exp>;
  comment?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "reviews" */
export enum Reviews_Constraint {
  /** unique or primary key constraint on columns "id" */
  ReviewsPkey = 'reviews_pkey'
}

/** input type for inserting data into table "reviews" */
export type Reviews_Insert_Input = {
  client_name?: InputMaybe<Scalars['String']['input']>;
  client_phone?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Reviews_Max_Fields = {
  __typename?: 'reviews_max_fields';
  client_name?: Maybe<Scalars['String']['output']>;
  client_phone?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Reviews_Min_Fields = {
  __typename?: 'reviews_min_fields';
  client_name?: Maybe<Scalars['String']['output']>;
  client_phone?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "reviews" */
export type Reviews_Mutation_Response = {
  __typename?: 'reviews_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Reviews>;
};

/** on_conflict condition type for table "reviews" */
export type Reviews_On_Conflict = {
  constraint: Reviews_Constraint;
  update_columns?: Array<Reviews_Update_Column>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};

/** Ordering options when selecting data from "reviews". */
export type Reviews_Order_By = {
  client_name?: InputMaybe<Order_By>;
  client_phone?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: reviews */
export type Reviews_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "reviews" */
export enum Reviews_Select_Column {
  /** column name */
  ClientName = 'client_name',
  /** column name */
  ClientPhone = 'client_phone',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "reviews" */
export type Reviews_Set_Input = {
  client_name?: InputMaybe<Scalars['String']['input']>;
  client_phone?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "reviews" */
export type Reviews_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reviews_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reviews_Stream_Cursor_Value_Input = {
  client_name?: InputMaybe<Scalars['String']['input']>;
  client_phone?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "reviews" */
export enum Reviews_Update_Column {
  /** column name */
  ClientName = 'client_name',
  /** column name */
  ClientPhone = 'client_phone',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id'
}

export type Reviews_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Reviews_Set_Input>;
  /** filter the rows which have to be updated */
  where: Reviews_Bool_Exp;
};

/** columns and relationships of "services" */
export type Services = {
  __typename?: 'services';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  image: Scalars['String']['output'];
  mainImage?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

/** aggregated selection of "services" */
export type Services_Aggregate = {
  __typename?: 'services_aggregate';
  aggregate?: Maybe<Services_Aggregate_Fields>;
  nodes: Array<Services>;
};

/** aggregate fields of "services" */
export type Services_Aggregate_Fields = {
  __typename?: 'services_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Services_Max_Fields>;
  min?: Maybe<Services_Min_Fields>;
};


/** aggregate fields of "services" */
export type Services_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Services_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "services". All fields are combined with a logical 'AND'. */
export type Services_Bool_Exp = {
  _and?: InputMaybe<Array<Services_Bool_Exp>>;
  _not?: InputMaybe<Services_Bool_Exp>;
  _or?: InputMaybe<Array<Services_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  mainImage?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "services" */
export enum Services_Constraint {
  /** unique or primary key constraint on columns "id" */
  ServicesPkey = 'services_pkey'
}

/** input type for inserting data into table "services" */
export type Services_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Services_Max_Fields = {
  __typename?: 'services_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  mainImage?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Services_Min_Fields = {
  __typename?: 'services_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  mainImage?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "services" */
export type Services_Mutation_Response = {
  __typename?: 'services_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Services>;
};

/** on_conflict condition type for table "services" */
export type Services_On_Conflict = {
  constraint: Services_Constraint;
  update_columns?: Array<Services_Update_Column>;
  where?: InputMaybe<Services_Bool_Exp>;
};

/** Ordering options when selecting data from "services". */
export type Services_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  mainImage?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: services */
export type Services_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "services" */
export enum Services_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  MainImage = 'mainImage',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "services" */
export type Services_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "services" */
export type Services_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Services_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Services_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "services" */
export enum Services_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  MainImage = 'mainImage',
  /** column name */
  Name = 'name'
}

export type Services_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Services_Set_Input>;
  /** filter the rows which have to be updated */
  where: Services_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "admin" */
  admin: Array<Admin>;
  /** fetch aggregated fields from the table: "admin" */
  admin_aggregate: Admin_Aggregate;
  /** fetch data from the table: "admin" using primary key columns */
  admin_by_pk?: Maybe<Admin>;
  /** fetch data from the table in a streaming manner: "admin" */
  admin_stream: Array<Admin>;
  /** fetch data from the table: "advantages" */
  advantages: Array<Advantages>;
  /** fetch aggregated fields from the table: "advantages" */
  advantages_aggregate: Advantages_Aggregate;
  /** fetch data from the table: "advantages" using primary key columns */
  advantages_by_pk?: Maybe<Advantages>;
  /** fetch data from the table in a streaming manner: "advantages" */
  advantages_stream: Array<Advantages>;
  /** fetch data from the table: "personnel" */
  personnel: Array<Personnel>;
  /** fetch aggregated fields from the table: "personnel" */
  personnel_aggregate: Personnel_Aggregate;
  /** fetch data from the table: "personnel" using primary key columns */
  personnel_by_pk?: Maybe<Personnel>;
  /** fetch data from the table: "personnel_categories" */
  personnel_categories: Array<Personnel_Categories>;
  /** fetch aggregated fields from the table: "personnel_categories" */
  personnel_categories_aggregate: Personnel_Categories_Aggregate;
  /** fetch data from the table: "personnel_categories" using primary key columns */
  personnel_categories_by_pk?: Maybe<Personnel_Categories>;
  /** fetch data from the table in a streaming manner: "personnel_categories" */
  personnel_categories_stream: Array<Personnel_Categories>;
  /** fetch data from the table in a streaming manner: "personnel" */
  personnel_stream: Array<Personnel>;
  /** fetch data from the table: "price_list" */
  price_list: Array<Price_List>;
  /** fetch aggregated fields from the table: "price_list" */
  price_list_aggregate: Price_List_Aggregate;
  /** fetch data from the table: "price_list" using primary key columns */
  price_list_by_pk?: Maybe<Price_List>;
  /** fetch data from the table: "price_list_categories" */
  price_list_categories: Array<Price_List_Categories>;
  /** fetch aggregated fields from the table: "price_list_categories" */
  price_list_categories_aggregate: Price_List_Categories_Aggregate;
  /** fetch data from the table: "price_list_categories" using primary key columns */
  price_list_categories_by_pk?: Maybe<Price_List_Categories>;
  /** fetch data from the table in a streaming manner: "price_list_categories" */
  price_list_categories_stream: Array<Price_List_Categories>;
  /** fetch data from the table in a streaming manner: "price_list" */
  price_list_stream: Array<Price_List>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "products_categories" */
  products_categories: Array<Products_Categories>;
  /** fetch aggregated fields from the table: "products_categories" */
  products_categories_aggregate: Products_Categories_Aggregate;
  /** fetch data from the table: "products_categories" using primary key columns */
  products_categories_by_pk?: Maybe<Products_Categories>;
  /** fetch data from the table in a streaming manner: "products_categories" */
  products_categories_stream: Array<Products_Categories>;
  /** fetch data from the table in a streaming manner: "products" */
  products_stream: Array<Products>;
  /** fetch data from the table: "reviews" */
  reviews: Array<Reviews>;
  /** fetch aggregated fields from the table: "reviews" */
  reviews_aggregate: Reviews_Aggregate;
  /** fetch data from the table: "reviews" using primary key columns */
  reviews_by_pk?: Maybe<Reviews>;
  /** fetch data from the table in a streaming manner: "reviews" */
  reviews_stream: Array<Reviews>;
  /** fetch data from the table: "services" */
  services: Array<Services>;
  /** fetch aggregated fields from the table: "services" */
  services_aggregate: Services_Aggregate;
  /** fetch data from the table: "services" using primary key columns */
  services_by_pk?: Maybe<Services>;
  /** fetch data from the table in a streaming manner: "services" */
  services_stream: Array<Services>;
};


export type Subscription_RootAdminArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdmin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdmin_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAdmin_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Admin_Stream_Cursor_Input>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdvantagesArgs = {
  distinct_on?: InputMaybe<Array<Advantages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Advantages_Order_By>>;
  where?: InputMaybe<Advantages_Bool_Exp>;
};


export type Subscription_RootAdvantages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Advantages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Advantages_Order_By>>;
  where?: InputMaybe<Advantages_Bool_Exp>;
};


export type Subscription_RootAdvantages_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAdvantages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Advantages_Stream_Cursor_Input>>;
  where?: InputMaybe<Advantages_Bool_Exp>;
};


export type Subscription_RootPersonnelArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


export type Subscription_RootPersonnel_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Order_By>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


export type Subscription_RootPersonnel_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPersonnel_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Categories_Order_By>>;
  where?: InputMaybe<Personnel_Categories_Bool_Exp>;
};


export type Subscription_RootPersonnel_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Personnel_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Personnel_Categories_Order_By>>;
  where?: InputMaybe<Personnel_Categories_Bool_Exp>;
};


export type Subscription_RootPersonnel_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPersonnel_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Personnel_Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Personnel_Categories_Bool_Exp>;
};


export type Subscription_RootPersonnel_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Personnel_Stream_Cursor_Input>>;
  where?: InputMaybe<Personnel_Bool_Exp>;
};


export type Subscription_RootPrice_ListArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Order_By>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};


export type Subscription_RootPrice_List_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Order_By>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};


export type Subscription_RootPrice_List_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPrice_List_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Categories_Order_By>>;
  where?: InputMaybe<Price_List_Categories_Bool_Exp>;
};


export type Subscription_RootPrice_List_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Price_List_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Price_List_Categories_Order_By>>;
  where?: InputMaybe<Price_List_Categories_Bool_Exp>;
};


export type Subscription_RootPrice_List_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPrice_List_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Price_List_Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Price_List_Categories_Bool_Exp>;
};


export type Subscription_RootPrice_List_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Price_List_Stream_Cursor_Input>>;
  where?: InputMaybe<Price_List_Bool_Exp>;
};


export type Subscription_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootProducts_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Products_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Categories_Order_By>>;
  where?: InputMaybe<Products_Categories_Bool_Exp>;
};


export type Subscription_RootProducts_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Categories_Order_By>>;
  where?: InputMaybe<Products_Categories_Bool_Exp>;
};


export type Subscription_RootProducts_Categories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootProducts_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Products_Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Products_Categories_Bool_Exp>;
};


export type Subscription_RootProducts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Products_Stream_Cursor_Input>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootReviewsArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Subscription_RootReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Subscription_RootReviews_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootReviews_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Reviews_Stream_Cursor_Input>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Subscription_RootServicesArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};


export type Subscription_RootServices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};


export type Subscription_RootServices_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootServices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Services_Stream_Cursor_Input>>;
  where?: InputMaybe<Services_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type CreateReviewMutationVariables = Exact<{
  client_name: Scalars['String']['input'];
  client_phone: Scalars['String']['input'];
  comment: Scalars['String']['input'];
}>;


export type CreateReviewMutation = { __typename?: 'mutation_root', insert_reviews_one?: { __typename?: 'reviews', client_name: string, client_phone: string, comment: string } | null };

export type GetReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReviewsQuery = { __typename?: 'query_root', reviews: Array<{ __typename?: 'reviews', created_at: any, id: any, comment: string, client_phone: string, client_name: string }> };

export type GetAdvantagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdvantagesQuery = { __typename?: 'query_root', advantages: Array<{ __typename?: 'advantages', id: any, title: string }> };

export type GetPersonnelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonnelQuery = { __typename?: 'query_root', personnel: Array<{ __typename?: 'personnel', name: string, description: string, image: string, id: any, personnel_category?: { __typename?: 'personnel_categories', title: string } | null, personnel_category_second?: { __typename?: 'personnel_categories', title: string } | null }> };

export type GetPriceListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriceListQuery = { __typename?: 'query_root', price_list_categories: Array<{ __typename?: 'price_list_categories', title: string, slug?: string | null, id: any, price_list_items: Array<{ __typename?: 'price_list', id: any, price: any, title: string }> }> };

export type GetPriceListCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriceListCategoriesQuery = { __typename?: 'query_root', price_list_categories: Array<{ __typename?: 'price_list_categories', title: string, slug?: string | null, id: any }> };

export type GetPriceListCategoryByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriceListCategoryByIdQuery = { __typename?: 'query_root', price_list: Array<{ __typename?: 'price_list', price: any, id: any, title: string }> };

export type GetServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesQuery = { __typename?: 'query_root', services: Array<{ __typename?: 'services', image: string, id: any, name: string }> };

export type GetServiceByIdQueryVariables = Exact<{
  _eq: Scalars['uuid']['input'];
}>;


export type GetServiceByIdQuery = { __typename?: 'query_root', services: Array<{ __typename?: 'services', id: any, image: string, name: string, mainImage?: string | null, description?: string | null }> };


export const CreateReviewDocument = gql`
    mutation createReview($client_name: String!, $client_phone: String!, $comment: String!) {
  insert_reviews_one(
    object: {comment: $comment, client_phone: $client_phone, client_name: $client_name}
  ) {
    client_name
    client_phone
    comment
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      client_name: // value for 'client_name'
 *      client_phone: // value for 'client_phone'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetReviewsDocument = gql`
    query GetReviews {
  reviews {
    created_at
    id
    comment
    client_phone
    client_name
  }
}
    `;

/**
 * __useGetReviewsQuery__
 *
 * To run a query within a React component, call `useGetReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
      }
export function useGetReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export function useGetReviewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export type GetReviewsQueryHookResult = ReturnType<typeof useGetReviewsQuery>;
export type GetReviewsLazyQueryHookResult = ReturnType<typeof useGetReviewsLazyQuery>;
export type GetReviewsSuspenseQueryHookResult = ReturnType<typeof useGetReviewsSuspenseQuery>;
export type GetReviewsQueryResult = Apollo.QueryResult<GetReviewsQuery, GetReviewsQueryVariables>;
export const GetAdvantagesDocument = gql`
    query GetAdvantages {
  advantages {
    id
    title
  }
}
    `;

/**
 * __useGetAdvantagesQuery__
 *
 * To run a query within a React component, call `useGetAdvantagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdvantagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdvantagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdvantagesQuery(baseOptions?: Apollo.QueryHookOptions<GetAdvantagesQuery, GetAdvantagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdvantagesQuery, GetAdvantagesQueryVariables>(GetAdvantagesDocument, options);
      }
export function useGetAdvantagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdvantagesQuery, GetAdvantagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdvantagesQuery, GetAdvantagesQueryVariables>(GetAdvantagesDocument, options);
        }
export function useGetAdvantagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdvantagesQuery, GetAdvantagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdvantagesQuery, GetAdvantagesQueryVariables>(GetAdvantagesDocument, options);
        }
export type GetAdvantagesQueryHookResult = ReturnType<typeof useGetAdvantagesQuery>;
export type GetAdvantagesLazyQueryHookResult = ReturnType<typeof useGetAdvantagesLazyQuery>;
export type GetAdvantagesSuspenseQueryHookResult = ReturnType<typeof useGetAdvantagesSuspenseQuery>;
export type GetAdvantagesQueryResult = Apollo.QueryResult<GetAdvantagesQuery, GetAdvantagesQueryVariables>;
export const GetPersonnelDocument = gql`
    query GetPersonnel {
  personnel {
    name
    description
    image
    id
    personnel_category {
      title
    }
    personnel_category_second {
      title
    }
  }
}
    `;

/**
 * __useGetPersonnelQuery__
 *
 * To run a query within a React component, call `useGetPersonnelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonnelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonnelQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersonnelQuery(baseOptions?: Apollo.QueryHookOptions<GetPersonnelQuery, GetPersonnelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonnelQuery, GetPersonnelQueryVariables>(GetPersonnelDocument, options);
      }
export function useGetPersonnelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonnelQuery, GetPersonnelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonnelQuery, GetPersonnelQueryVariables>(GetPersonnelDocument, options);
        }
export function useGetPersonnelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPersonnelQuery, GetPersonnelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPersonnelQuery, GetPersonnelQueryVariables>(GetPersonnelDocument, options);
        }
export type GetPersonnelQueryHookResult = ReturnType<typeof useGetPersonnelQuery>;
export type GetPersonnelLazyQueryHookResult = ReturnType<typeof useGetPersonnelLazyQuery>;
export type GetPersonnelSuspenseQueryHookResult = ReturnType<typeof useGetPersonnelSuspenseQuery>;
export type GetPersonnelQueryResult = Apollo.QueryResult<GetPersonnelQuery, GetPersonnelQueryVariables>;
export const GetPriceListDocument = gql`
    query GetPriceList {
  price_list_categories {
    title
    slug
    id
    price_list_items {
      id
      price
      title
    }
  }
}
    `;

/**
 * __useGetPriceListQuery__
 *
 * To run a query within a React component, call `useGetPriceListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriceListQuery(baseOptions?: Apollo.QueryHookOptions<GetPriceListQuery, GetPriceListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriceListQuery, GetPriceListQueryVariables>(GetPriceListDocument, options);
      }
export function useGetPriceListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriceListQuery, GetPriceListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriceListQuery, GetPriceListQueryVariables>(GetPriceListDocument, options);
        }
export function useGetPriceListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPriceListQuery, GetPriceListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPriceListQuery, GetPriceListQueryVariables>(GetPriceListDocument, options);
        }
export type GetPriceListQueryHookResult = ReturnType<typeof useGetPriceListQuery>;
export type GetPriceListLazyQueryHookResult = ReturnType<typeof useGetPriceListLazyQuery>;
export type GetPriceListSuspenseQueryHookResult = ReturnType<typeof useGetPriceListSuspenseQuery>;
export type GetPriceListQueryResult = Apollo.QueryResult<GetPriceListQuery, GetPriceListQueryVariables>;
export const GetPriceListCategoriesDocument = gql`
    query GetPriceListCategories {
  price_list_categories {
    title
    slug
    id
  }
}
    `;

/**
 * __useGetPriceListCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPriceListCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceListCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceListCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriceListCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>(GetPriceListCategoriesDocument, options);
      }
export function useGetPriceListCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>(GetPriceListCategoriesDocument, options);
        }
export function useGetPriceListCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>(GetPriceListCategoriesDocument, options);
        }
export type GetPriceListCategoriesQueryHookResult = ReturnType<typeof useGetPriceListCategoriesQuery>;
export type GetPriceListCategoriesLazyQueryHookResult = ReturnType<typeof useGetPriceListCategoriesLazyQuery>;
export type GetPriceListCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetPriceListCategoriesSuspenseQuery>;
export type GetPriceListCategoriesQueryResult = Apollo.QueryResult<GetPriceListCategoriesQuery, GetPriceListCategoriesQueryVariables>;
export const GetPriceListCategoryByIdDocument = gql`
    query GetPriceListCategoryById {
  price_list {
    price
    id
    title
  }
}
    `;

/**
 * __useGetPriceListCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetPriceListCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceListCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceListCategoryByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriceListCategoryByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>(GetPriceListCategoryByIdDocument, options);
      }
export function useGetPriceListCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>(GetPriceListCategoryByIdDocument, options);
        }
export function useGetPriceListCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>(GetPriceListCategoryByIdDocument, options);
        }
export type GetPriceListCategoryByIdQueryHookResult = ReturnType<typeof useGetPriceListCategoryByIdQuery>;
export type GetPriceListCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetPriceListCategoryByIdLazyQuery>;
export type GetPriceListCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetPriceListCategoryByIdSuspenseQuery>;
export type GetPriceListCategoryByIdQueryResult = Apollo.QueryResult<GetPriceListCategoryByIdQuery, GetPriceListCategoryByIdQueryVariables>;
export const GetServicesDocument = gql`
    query GetServices {
  services {
    image
    id
    name
  }
}
    `;

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export function useGetServicesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesSuspenseQueryHookResult = ReturnType<typeof useGetServicesSuspenseQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetServiceByIdDocument = gql`
    query GetServiceById($_eq: uuid!) {
  services(where: {id: {_eq: $_eq}}) {
    id
    image
    name
    mainImage
    description
  }
}
    `;

/**
 * __useGetServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByIdQuery({
 *   variables: {
 *      _eq: // value for '_eq'
 *   },
 * });
 */
export function useGetServiceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables> & ({ variables: GetServiceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
      }
export function useGetServiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export function useGetServiceByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export type GetServiceByIdQueryHookResult = ReturnType<typeof useGetServiceByIdQuery>;
export type GetServiceByIdLazyQueryHookResult = ReturnType<typeof useGetServiceByIdLazyQuery>;
export type GetServiceByIdSuspenseQueryHookResult = ReturnType<typeof useGetServiceByIdSuspenseQuery>;
export type GetServiceByIdQueryResult = Apollo.QueryResult<GetServiceByIdQuery, GetServiceByIdQueryVariables>;