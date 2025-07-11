CREATE TABLE public."student" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    age INTEGER NOT NULL,
    date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    date_modified TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()  
);


CREATE TABLE public."classroom"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" TEXT NOT NULL,
    key_stage TEXT NOT NULL,
    "subject" TEXT NOT NULL
);


CREATE TABLE public."classroom_members"(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    classroom_id UUID NOT NULL REFERENCES public."classroom"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    student_id UUID NOT NULL REFERENCES public."student"(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE(classroom_id, student_id)
);