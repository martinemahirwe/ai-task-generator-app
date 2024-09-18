"use client";
import { useCreateTask } from "~/hooks/useCreateTask";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const QuestionForm = () => {

  const {
    answer,
    register,
    handleSubmit,
    renderQuestions,
    onSubmit,
    handleTypeSelection,
    loading,
    loader,
    grades,
    QUESTION_TYPES,
    errors,
    selectedType,
    questions,
    onGrading,
    gradingRes
  } = useCreateTask();
  
  return (
    <div className="quiz-form-container">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-gray-100 p-6 shadow-md"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="topic"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
            {...register("topic")}
          />
          {errors && <span>{errors.root?.message}</span>}
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-bold">Question Types</h3>
          <div className="grid grid-cols-5 gap-3">
            {QUESTION_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSelection(type.id)}
                className={`flex items-center justify-center rounded-lg border p-2 ${
                  selectedType?.includes(type.id)
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-white"
                } transition-colors hover:border-blue-500`}
              >
                <span className="mr-1 text-lg">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            key={selectedType?.length}
            type="submit"
            className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            {loading?'Generating Questions...':'Generate Questions'}
          </button>
          <div className="flex items-center justify-center mt-4 p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg text-white">
           <span className="mr-2 text-lg font-semibold">You scored:</span>
          <div className="flex items-center space-x-2">
          {grades.length >= 1 ? (
          <span className="text-2xl font-bold">
        {grades.reduce((acc, cur) => Math.ceil((acc + cur) / grades.length), 0)}{" "}
        <span className="text-sm font-normal">/ 5</span>
      </span>
    ) : (
      <span className="italic">No grades yet</span>
    )}
  </div>
</div>

        </div>
      </form>

     {questions.map((question) =>(
          <div key={question.id} className="questions-wrapper mt-6">
            <form>
              <div>{renderQuestions(question)}</div>
            </form>

            {gradingRes.map((grade)=>( grade.questionId === question.id &&
              <div
              key={grade.questionId}
                className={`mt-4 p-4 rounded-lg shadow-md ${
                  grade.grading > 2 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="text-gray-800 mt-2">
                  <strong>Expected Response:</strong>
                  <span className="block text-green-700">
                    {grade.expectedAnswers}
                  </span>
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Your Response:</strong>
                  <span className="block text-blue-700">
                    {grade.userAnswers}
                  </span>
                </p>
                <p
                  className={`mt-4 font-bold ${
                    grade.grading > 2
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {grade.grading > 2 ? "Correct!" : "Incorrect."} You scored{" "}
                  {grade.grading}.
                </p>
              </div>
            ))}
          </div>
        )
      )}

      {questions.length >= 1 && (
        <button
          key={gradingRes.length}
          type="button"
          onClick={onGrading}
          disabled={grades.length >= 1 || loader}
          className={`focus:shadow-outline mt-4 rounded px-4 py-2 font-bold text-white transition-colors
            ${grades.length >= 1 || loader ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 focus:outline-none'}`}
        >
          {loader?"loading...":"Grade Questions"}
        </button>
      )}
    </div>
  );
};

export default QuestionForm;
