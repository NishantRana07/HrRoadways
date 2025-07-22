import { useState, useEffect } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { motion } from "framer-motion";

import { eightTranslationURL } from "../constants";

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);

  useEffect(() => {
    fetch(eightTranslationURL)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error("Error fetching translations:", error);
      });
  }, [isHindi]);

  return currentLanguage;
};

const Reviews = ({ isHindi }) => {
  const currentLanguage = useTranslation(isHindi);
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      date: "2025-01-30",
      rating: 5,
      comment:
        "Excellent service! The buses are punctual and the staff is very helpful.",
      likes: 12,
      dislikes: 1,
      topic: "On Time",
      photo: null,
      replies: [
        {
          name: "Assistant",
          date: "2025-01-30",
          comment:
            "Thank you for your positive feedback, John! We're glad to hear that you enjoyed our punctual service.",
        },
        {
          name: "Jane Doe",
          date: "2025-01-31",
          comment: "I agree! The service is indeed excellent.",
        },
      ],
    },
    // Add more reviews here
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortTopic, setSortTopic] = useState("All");
  const [newReview, setNewReview] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    rating: 0,
    comment: "",
    likes: 0,
    dislikes: 0,
    topic: "All",
    photo: null,
    replies: [],
  });
  const [newReply, setNewReply] = useState("");
  const reviewsPerPage = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview({ ...newReview, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, newReview]);
    setNewReview({
      name: "",
      date: new Date().toISOString().split("T")[0],
      rating: 0,
      comment: "",
      likes: 0,
      dislikes: 0,
      topic: "All",
      photo: null,
      replies: [],
    });
  };

  const handleLike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
  };

  const handleDislike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].dislikes += 1;
    setReviews(updatedReviews);
  };

  const handleReplySubmit = (index) => {
    if (newReply.trim() !== "") {
      const updatedReviews = [...reviews];
      updatedReviews[index].replies.push({
        name: "Assistant",
        date: new Date().toISOString().split("T")[0],
        comment: newReply,
      });
      setReviews(updatedReviews);
      setNewReply("");
    }
  };

  const filteredReviews =
    sortTopic === "All"
      ? reviews
      : reviews.filter((review) => review.topic === sortTopic);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (!currentLanguage) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mb-9 p-10 rounded-lg">
      <h1 className="text-5xl font-bold text-center mb-10 mt-12">
        {currentLanguage.title}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-10">
          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold">
              {currentLanguage.sortBy}
            </label>
            <div className="relative inline-block w-full">
              <select
                value={sortTopic}
                onChange={(e) => setSortTopic(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
              >
                {currentLanguage.topics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-6-6h12z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="reviews-section flex flex-col space-y-6">
            {currentReviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {review.name}
                    </h2>
                    <p className="text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-6 w-6 ${
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{review.comment}</p>
                {review.photo && (
                  <img
                    src={review.photo}
                    alt="Review"
                    className="mt-4 rounded-lg shadow-md"
                  />
                )}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(index)}
                      className="flex items-center text-green-500 hover:text-green-600 transition"
                    >
                      <FaThumbsUp className="mr-2" /> {review.likes}
                    </button>
                    <button
                      onClick={() => handleDislike(index)}
                      className="flex items-center text-red-500 hover:text-red-600 transition"
                    >
                      <FaThumbsDown className="mr-2" /> {review.dislikes}
                    </button>
                  </div>
                  <p className="text-gray-500">{review.topic}</p>
                </div>
                {review.replies.map((reply, replyIndex) => (
                  <div
                    key={replyIndex}
                    className="mt-4 ml-6 p-4 bg-gray-100 rounded-lg shadow-inner"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {reply.name}
                        </h3>
                        <p className="text-gray-500">{reply.date}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{reply.comment}</p>
                  </div>
                ))}
                <div className="mt-4 ml-6">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder={currentLanguage.reply}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  ></textarea>
                  <button
                    onClick={() => handleReplySubmit(index)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    {currentLanguage.addReply}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePreviousPage}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              disabled={currentPage === 1}
            >
              {currentLanguage.previous}
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              disabled={currentPage === totalPages}
            >
              {currentLanguage.next}
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/3 lg:pl-10 mb-10 lg:mb-0">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {currentLanguage.addReview}
            </h2>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                placeholder={currentLanguage.namePlaceholder}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder={currentLanguage.commentPlaceholder}
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2">{currentLanguage.sortBy}: </label>
              <select
                name="topic"
                value={newReview.topic}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              >
                {currentLanguage.topics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">{currentLanguage.addPhoto}: </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Rating: </label>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => handleStarClick(i + 1)}
                    className={`h-8 w-8 cursor-pointer ${
                      i < newReview.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {currentLanguage.submit}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
