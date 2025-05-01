import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const MockInterview = pgTable('mock_interview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('json_mock_resp').notNull(),
  jobPosition: varchar('job_position').notNull(),
  jobDesc: varchar('job_desc').notNull(),
  jobExperience: varchar('job_experience').notNull(),
  createdBy: varchar('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  mockId: varchar('mock_id').notNull().unique()
});

export const Question = pgTable('question', {
    id: serial('id').primaryKey(),
    mockQuestionJsonResp: text('mock_question_json_resp').notNull(),
    jobPosition: varchar('job_position').notNull(),
    jobDesc: varchar('job_desc').notNull(),
    jobExperience: varchar('job_experience').notNull(),
    typeQuestion: varchar('type_question').notNull(),
    company: varchar('company').notNull(),
    createdBy: varchar('created_by').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(), // Changed to timestamp
    mockId: varchar('mock_id').notNull().unique()
  });

export const UserAnswer = pgTable('user_answer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mock_id_ref').notNull(),
  question: varchar('question').notNull(),
  correctAns: text('correct_ans'),
  userAns: text('user_ans'),
  feedback: text('feedback'),
  rating: varchar('rating'),
  userEmail: varchar('user_email'),
  createdAt: timestamp('created_at').defaultNow()
});

export const Newsletter = pgTable('newsletter', {
  id: serial('id').primaryKey(),
  newName: varchar('new_name'),
  newEmail: varchar('new_email'),
  newMessage: text('new_message'),
  createdAt: timestamp('created_at').defaultNow()
});

// Define relations
export const questionRelations = relations(Question, ({ many }) => ({
  answers: many(UserAnswer)
}));

export const userAnswerRelations = relations(UserAnswer, ({ one }) => ({
  question: one(Question, {
    fields: [UserAnswer.mockIdRef],
    references: [Question.mockId]
  })
}));