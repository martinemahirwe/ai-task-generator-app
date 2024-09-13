import QuestionForm from "./components/QuestionForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Task Generator
        </h1>
        <QuestionForm />
      </div>
    </div>
  );
};

export default Home;
