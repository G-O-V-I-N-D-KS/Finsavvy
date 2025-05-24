import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css';

const SampleArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ display: "block", background: "#6922fc", borderRadius: 20 }}
    onClick={onClick}
  />
);

const Carousel = () => {
  const [plannerData, setPlannerData] = useState([]);
  const [showAddPlannerPopup, setShowAddPlannerPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideColors = ['#ff9999', '#99ff99', '#9999ff']; // Example slide colors

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    afterChange: (index) => setCurrentSlide(index)
  };

  const fetchPlannerData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (id && token) {
        const url = `http://localhost:3000/api/${id}/planner`;
        const response = await fetch(url, {
          headers: {
            Authorization: token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch planner data');
        }

        const result = await response.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          setPlannerData(result.data);
        } else {
          console.error('Invalid response format or empty data array');
        }
      } else {
        console.error('User ID or token not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching planner data:', error);
    }
  };

  useEffect(() => {
    fetchPlannerData(); // Initial fetch on component mount
  }, []);

  const handleAddPlannerClick = () => {
    setShowAddPlannerPopup(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (id && token) {
        const url = `http://localhost:3000/api/${id}/newPlanner`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Failed to add new planner');
        }

        // Close popup after successful submission
        setShowAddPlannerPopup(false);

        // Re-fetch planner data to update carousel
        fetchPlannerData(); // Invoke the fetchPlannerData function
      } else {
        console.error('User ID or token not found in localStorage');
      }
    } catch (error) {
      console.error('Error adding new planner:', error);
    }
  };

  const handleClosePopup = () => {
    setShowAddPlannerPopup(false);
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} initialSlide={currentSlide}>
        {plannerData.map((dataItem, index) => (
          <div className="slide" key={index} style={{ backgroundColor: slideColors[index % slideColors.length] }}>
            <div className="slide-inner" style={{ backgroundColor: slideColors[index % slideColors.length] }}>
              <h5>{dataItem.title}</h5>
              <div className="slideContent">
                <div>
                  <h6>Value</h6>
                  <h5>{dataItem.value}</h5>
                </div>
                <div>
                  <h6>Maturity</h6>
                  <h5>{dataItem.Maturity}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Last Slide for adding new planner */}
        <div className="slide" key="addNew" style={{ backgroundColor: slideColors[(plannerData.length) % slideColors.length] }} onClick={handleAddPlannerClick}>
          <div className="slide-inner" style={{ backgroundColor: slideColors[(plannerData.length) % slideColors.length] }}>
            <h1>+</h1>
            <h5>Add New Planner</h5>
          </div>
        </div>
      </Slider>

      {/* Add New Planner Popup */}
      {showAddPlannerPopup && (
        <div className="popup-container">
          <div className="popup">
            <button className="close-button" onClick={handleClosePopup}>X</button>
            <h2>Add New Planner</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  title: e.target.title.value,
                  target_amount: parseInt(e.target.targetAmount.value),
                  installment_day: e.target.installmentDay.value,
                  mature_date: e.target.matureDate.value,
                  current_value: 0
                };

                const targetAmount = formData.target_amount;
                const matureDate = new Date(formData.mature_date);
                const currentDate = new Date();
                const monthsDifference = (matureDate.getFullYear() - currentDate.getFullYear()) * 12 + (matureDate.getMonth() - currentDate.getMonth());
                formData.installment = targetAmount / monthsDifference;

                handleFormSubmit(formData);
              }}
            >
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />

              <label htmlFor="targetAmount">Target Amount:</label>
              <input type="number" id="targetAmount" name="targetAmount" required />

              <label htmlFor="installmentDay">Installment Day:</label>
              <input type="text" id="installmentDay" name="installmentDay" required />

              <label htmlFor="matureDate">Mature Date:</label>
              <input type="date" id="matureDate" name="matureDate" required />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
