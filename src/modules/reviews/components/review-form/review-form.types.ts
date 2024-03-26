export interface ReviewFormProps {
  submitCallback?: (values: ReviewFormValues) => Promise<void>;
}

export interface ReviewFormValues {
  client_name: string;
  phoneNumber: string;
  comment: string;
}

export interface UseReviewFormOptions {
  callback?: (values: ReviewFormValues) => Promise<void>;
}
