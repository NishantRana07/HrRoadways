import React, { useState, useEffect } from "react"; 
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "./Loading";

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const translationsUrl =
    "https://jsonblob.com/api/jsonBlob/1397956711553359872"; // Created a new jsonBlob

  useEffect(() => {
    fetch(translationsUrl)
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
    {
      name: "Priya Sharma",
      date: "2025-02-12",
      rating: 4,
      comment:
        "The bus was clean and well-maintained. Staff behavior was very polite and professional.",
      likes: 8,
      dislikes: 0,
      topic: "Cleanliness",
      photo: null,
      replies: [
        {
          name: "Assistant",
          date: "2025-02-13",
          comment:
            "Thank you for your kind words, Priya! We’ll keep working hard to maintain cleanliness standards.",
        },
      ],
    },
    {
      name: "Rahul Verma",
      date: "2025-03-03",
      rating: 3,
      comment:
        "The ride was comfortable, but the bus was 20 minutes late. It could be more punctual.",
      likes: 3,
      dislikes: 2,
      topic: "On Time",
      photo: null,
      replies: [
        {
          name: "Assistant",
          date: "2025-03-04",
          comment:
            "We apologize for the delay, Rahul. Your feedback has been noted and will help us improve.",
        },
      ],
    },
    {
      name: "Aditi Mehta",
      date: "2025-03-15",
      rating: 5,
      comment:
        "Great value for money! Affordable fares and a very smooth journey. Highly recommended.",
      likes: 15,
      dislikes: 1,
      topic: "Pricing",
      photo: null,
      replies: [],
    },
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

  const [errors, setErrors] = useState({});
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
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, photo: "Only JPG, PNG, or GIF files are allowed." });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, photo: "File size must be less than 2MB." });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview({ ...newReview, photo: reader.result });
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, photo: null });
    }
  };

  // ✅ Advanced validation
  const validateReview = () => {
    const newErrors = {};

    if (!newReview.name || newReview.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!newReview.comment || newReview.comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters long.";
    }

    if (!newReview.rating || newReview.rating === 0) {
      newErrors.rating = "Please select a rating.";
    }

    if (!newReview.topic || newReview.topic === "All") {
      newErrors.topic = "Please select a valid topic.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateReview()) {
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
      setErrors({});
    }
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
    return <Loading />;
  }

  return (
    <div className="p-10 mx-auto rounded-lg max-w-7xl mb-9 dark:bg-gray-950 dark:text-white">
      <h1 className="mt-12 mb-10 text-5xl font-bold text-center">
        {currentLanguage.title}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Reviews Section */}
        <div className="w-full lg:w-2/3 lg:pr-10">
          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold">
              {currentLanguage.sortBy}
            </label>
            <div className="relative inline-block w-full">
              <select
                value={sortTopic}
                onChange={(e) => setSortTopic(e.target.value)}
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
              >
                {currentLanguage.topics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-6-6h12z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="flex flex-col space-y-6 reviews-section">
            {currentReviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
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
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(index)}
                      className="flex items-center text-green-500 hover:text-green-600"
                    >
                      <FaThumbsUp className="mr-2" /> {review.likes}
                    </button>
                    <button
                      onClick={() => handleDislike(index)}
                      className="flex items-center text-red-500 hover:text-red-600"
                    >
                      <FaThumbsDown className="mr-2" /> {review.dislikes}
                    </button>
                  </div>
                  <p className="text-gray-500">{review.topic}</p>
                </div>

                {/* Replies */}
                {review.replies.map((reply, replyIndex) => (
                  <div
                    key={replyIndex}
                    className="p-4 mt-4 ml-6 bg-gray-100 rounded-lg shadow-inner"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {reply.name}
                    </h3>
                    <p className="text-gray-500">{reply.date}</p>
                    <p className="mt-2 text-gray-700">{reply.comment}</p>
                  </div>
                ))}

                {/* Add Reply */}
                <div className="mt-4 ml-6">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder={currentLanguage.reply}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  ></textarea>
                  <button
                    onClick={() => handleReplySubmit(index)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    {currentLanguage.addReply}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={currentPage === 1}
            >
              {currentLanguage.previous}
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={currentPage === totalPages}
            >
              {currentLanguage.next}
            </button>
          </div>
        </div>

        {/* Add Review Form */}
        <div className="w-full mb-10 lg:w-1/3 lg:pl-10 lg:mb-0">
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-100 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="mb-4 text-2xl font-semibold">
              {currentLanguage.addReview}
            </h2>

            {/* Name */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                placeholder={currentLanguage.namePlaceholder}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Comment */}
            <div className="mb-4">
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder={currentLanguage.commentPlaceholder}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
              {errors.comment && (
                <p className="mt-1 text-sm text-red-500">{errors.comment}</p>
              )}
            </div>

            {/* Topic */}
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
              {errors.topic && (
                <p className="mt-1 text-sm text-red-500">{errors.topic}</p>
              )}
            </div>

            {/* Photo */}
            <div className="mb-4">
              <label className="block mb-2">{currentLanguage.addPhoto}: </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.photo && (
                <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
              )}
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block mb-2">Rating: </label>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => handleStarClick(i + 1)}
                    className={`h-8 w-8 cursor-pointer ${
                      i < newReview.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
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
