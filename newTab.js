document.addEventListener("DOMContentLoaded", async () => {
  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background-container";
  document.body.appendChild(backgroundContainer);

  const categoriesContainer = document.getElementById("categories-container");
  const tasksContainer = document.getElementById("tasks-container");
  const taskList = document.getElementById("task-list");
  const resetButton = document.getElementById("reset-button");
  const resetModal = document.getElementById("reset-modal");
  const resetYesButton = document.getElementById("reset-yes");
  const resetNoButton = document.getElementById("reset-no");

  // for controlling when hovers are active
  let hoverListeners = [];

  // Initial background image with 5 deers
  const initialBackground = "assets/original.jpg";

  // Background images for each category
  const backgroundSets = {
    daily: [
      "assets/A.png",
      "assets/A1.png",
      "assets/A2.png",
      "assets/A3.png",
      "assets/A4.png",
      "assets/A5.png",
    ],
    weekly: [
      "assets/A.png",
      "assets/A1.png",
      "assets/A2.png",
      "assets/A3.png",
      "assets/A4.png",
      "assets/A5.png",
    ],
    home: [
      "assets/B.png",
      "assets/B1.png",
      "assets/B2.png",
      "assets/B3.png",
      "assets/B4.png",
      "assets/B5.png",
    ],
    pet: [
      "assets/C.png",
      "assets/C1.png",
      "assets/C2.png",
      "assets/C3.png",
      "assets/C4.png",
      "assets/C5.png",
    ],
    friends: [
      "assets/D.png",
      "assets/D1.png",
      "assets/D2.png",
      "assets/D3.png",
      "assets/D4.png",
      "assets/D5.png",
    ],
    mind: [
      "assets/E.png",
      "assets/E1.png",
      "assets/E2.png",
      "assets/E3.png",
      "assets/E4.png",
      "assets/E5.png",
    ],
    others: [
      "assets/F.png",
      "assets/F1.png",
      "assets/F2.png",
      "assets/F3.png",
      "assets/F4.png",
      "assets/F5.png",
    ],
  };

  // Hover effect logic
  const deerAreas = [
    {
      id: "deer1",
      top: 530,
      left: 400,
      width: 150,
      height: 250,
      circleImage: "assets/circle_selfcare.png",
      category: "daily",
    },
    {
      id: "deer7", // weekly deer
      top: 20,
      left: 400,
      width: 300,
      height: 300,
      circleImage: "assets/circle_weekly.png",
      category: "weekly",
    },
    {
      id: "deer2",
      top: 570,
      left: 1510,
      width: 100,
      height: 200,
      circleImage: "assets/circle_lovedones.png",
      category: "friends",
    },
    {
      id: "deer3",
      top: 630,
      left: 1310,
      width: 100,
      height: 200,
      circleImage: "assets/circle_pets.png",
      category: "pet",
    },
    {
      id: "deer4",
      top: 540,
      left: 800,
      width: 120,
      height: 220,
      circleImage: "assets/circle_thehome.png",
      category: "home",
    },
    {
      id: "deer5",
      top: 600,
      left: 1150,
      width: 90,
      height: 160,
      circleImage: "assets/circle_themind.png",
      category: "mind",
    },
    {
      id: "deer6", // Unique ID for the new hover area
      top: 30, // Adjust the top position to place it in the top right-hand corner
      left: 1280, // Adjust the left position to place it in the top right-hand corner
      width: 150, // Adjust the width of the hover area
      height: 150, // Adjust the height of the hover area
      circleImage: "assets/circle_somethingelse.png", // New image for the hover area
      category: "others", // Link to the "Others" category
    },
  ];

  function removeAllListeners() {
    hoverListeners.forEach((listener) => {
      document.removeEventListener("mousemove", listener);
      document.removeEventListener("click", listener);
    });
    hoverListeners = [];
  }

  deerAreas.forEach((area) => {
    const circle = document.getElementById(`${area.id}-circle`);
    circle.style.backgroundImage = `url(${area.circleImage})`;

    const circleWidth = getComputedStyle(circle).width || "200px";
    const size = parseInt(circleWidth);
    circle.style.left = `${area.left + area.width / 2 - size / 2}px`;
    circle.style.top = `${area.top + area.height / 2 - size / 2}px`;

    const checkHover = (e) => {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      if (
        mouseX >= area.left &&
        mouseX <= area.left + area.width &&
        mouseY >= area.top &&
        mouseY <= area.top + area.height
      ) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    };

    // Store listener reference for later removal
    hoverListeners.push(checkHover);
    document.addEventListener("mousemove", checkHover);

    const handleClick = (e) => {
      if (!circle.classList.contains("hidden")) {
        // Only handle clicks when circles are visible
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        if (
          mouseX >= area.left &&
          mouseX <= area.left + area.width &&
          mouseY >= area.top &&
          mouseY <= area.top + area.height
        ) {
          const categoryButton = document.querySelector(
            `.category-button[data-category="${area.category}"]`
          );
          if (categoryButton) {
            categoryButton.click();
            removeAllListeners(); // Remove listeners after category selection
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    hoverListeners.push(handleClick);
  });

  // Preload image function
  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  }

  // Function to change background with slide effect
  async function changeBackgroundWithSlide(newImageUrl) {
    try {
      // Preload the new image first
      await preloadImage(newImageUrl);

      return new Promise((resolve) => {
        const currentBg =
          backgroundContainer.querySelector(".background-slide");
        const newBg = document.createElement("div");
        newBg.className = "background-slide";

        // Set initial opacity to 0
        newBg.style.opacity = "0";
        newBg.style.backgroundImage = `url(${newImageUrl})`;

        // Add the new background
        backgroundContainer.appendChild(newBg);

        // Force a reflow to ensure the opacity transition works
        newBg.offsetHeight;

        // Fade in the new background
        requestAnimationFrame(() => {
          newBg.style.opacity = "1";

          if (currentBg) {
            // Start fading out the old background
            currentBg.style.opacity = "0";

            // Remove the old background after transition
            currentBg.addEventListener(
              "transitionend",
              () => {
                currentBg.remove();
                resolve();
              },
              { once: true }
            );
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      console.error("Error loading image:", error);
      return Promise.resolve();
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to hide hover circles
  function hideHoverCircles() {
    const hoverCircles = document.querySelectorAll(".deer-circle");
    hoverCircles.forEach((circle) => {
      circle.classList.add("hidden");
    });
  }

  // Function to show hover circles
  function showHoverCircles() {
    const hoverCircles = document.querySelectorAll(".deer-circle");
    hoverCircles.forEach((circle) => {
      circle.classList.remove("hidden");
    });
  }

  // Updated hardcoded tasks with new categories and random selection
  const taskPool = {
    daily: [
      "Brush teeth for two minutes",
      "Take a relaxing shower",
      "Eat a yummy breakfast",
      "Go for a refreshing 20 minute walk",
      "Change into your favorite outfit",
      "Brush your beautiful hair",
      "Floss between all your teeth",
      "Drink three full glasses of water",
      "Eat a serving of fruits or vegetables",
      "Tidy up your bed",
      "Trim your nails",
      "Moisturize your face and body",
      "Take your medications or vitamins",
      "Put on sunscreen",
      "Take five minutes to shave",
    ],
    weekly: [
      // Self-Care
  "Drink 8 glasses of water every day",
  "Do a 5-minute meditation each morning",
  "Go to bed before 11 PM each night",
  "Journal 3 things you're grateful for daily",
  "Avoid screens 30 minutes before bed",
  "Stretch your body for 5 minutes every day",
  "Do one thing just for yourself each day",
  "Say something kind to yourself in the mirror",
  "Choose a mantra and repeat it daily",

  // Home
  "Tidy up one small area each day",
  "Water your plants or check on your space",
  "Do one load of laundry or dishes daily",
  "Light a candle or diffuse essential oils",
  "Spend 10 minutes decluttering your space",
  "Make your bed every morning",
  "Open a window and get fresh air once a day",

  // Body
  "Take a 10-minute walk daily",
  "Do 10 squats, pushups, or stretches every day",
  "Dance to one song each day",
  "Try a short yoga video each evening",
  "Practice good posture for 1 hour a day",
  "Spend at least 1 hour away from your chair",

  // Mind
  "Read one page (or more) of a book daily",
  "Try one new thing each day",
  "Avoid complaining for a day",
  "No phone during meals challenge",
  "Spend 15 minutes being completely offline",

  // Connection
  "Send a nice message to someone you care about",
  "Compliment someone new every day",
  "Call or text someone you haven't spoken to in a while",
  "Try a new recipe or snack",
  "Watch the sunset or sunrise at least once",
  "Laugh out loud once a day"
    ],
    home: [
      "Wipe down kitchen counters and stove",
      "Vacuum your space",
      "Empty trash bins and replace bags",
      "Load or unload the dishwasher",
      "Make your bed",
      "Clean your bathroom sink, mirror, and toilet",
      "Sweep or mop the floors",
      "Stow away your clutter",
      "Wipe dining table and chairs",
      "Clean the inside of the microwave",
      "Sort mail and papers",
      "Water your plants",
      "Do a quick dusting of surfaces",
      "Put all your stray clothes in the hamper",
      "Organize your desk",
      "Do a load of laundry",
      "Wipe your electronic surfaces clean",
    ],
    pet: [
      "Provide fresh water in bowl",
      "Clean feeding area",
      "Brush fur",
      "Have dedicated playtime together",
      "Give healthy treats as rewards",
      "Monitor food and water intake",
      "Give pets attention and affection",
      "Check skin/coat for any abnormalities",
    ],
    friends: [
      "Send a thoughtful text message to someone you love",
      "Schedule a catch-up call/coffee",
      "Tell someone a nice compliment",
      "Wish someone a happy birthday today",
      "Give a meaningful compliment",
      "Share a memory/photo with someone",
      "Write a handwritten note",
      "Plan a meetup with some friends",
      "Send a short text to a friend you have not heard from lately",
      "Congratulate someone on a recent achievement",
    ],
    mind: [
      "Take 5 minutes to practice mindful breathing",
      "Write 3 things you are grateful for",
      "Listen to calming music",
      "Practice a 5 minute meditation",
      "Journal your current feelings down for ten minutes",
      "Read a chapter of your new book",
      "Follow a 10 minute stretching Youtube video",
      "Write down a list of 3 affirmations for yourself",
      "Organize one small space in your home",
      "Go outside for at least 20 minutes of fresh air",
      "Do one creative activity",
      "Practice Duolingo for 10 minutes",
    ],
  };

  // Function to get 5 random tasks from a category
  function getRandomTasks(category) {
    const tasks = taskPool[category];
    if (category === "weekly") {
      // ensure no duplicate tasks for weekly category
      const shuffled = [...tasks];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 5);
    } else {
      // maintain original logic for other categories
      return shuffleArray([...tasks]).slice(0, 5);
    }
  }

  const hardcodedTasks = {
    daily: getRandomTasks("daily"),
    home: getRandomTasks("home"),
    pet: getRandomTasks("pet"),
    friends: getRandomTasks("friends"),
    mind: getRandomTasks("mind"),
  };

  let sortableInstance = null;

  // Load saved state from chrome.storage.local
  chrome.storage.local.get("state", (data) => {
    if (data.state) {
      const {
        tasks,
        backgroundIndex,
        categoriesHidden,
        isFinalImage,
        selectedCategory,
      } = data.state;

      if (isFinalImage) {
        changeBackgroundWithSlide(
          backgroundSets[selectedCategory][
            backgroundSets[selectedCategory].length - 1
          ]
        ).then(() => {
          tasksContainer.classList.add("hidden");
          categoriesContainer.classList.add("hidden");
          hideHoverCircles(); // Hide hover circles when the final image is shown
          document.getElementById("welcome-message").classList.add("hidden");

          // Create and show thank you message
          const thankYouMessage = document.createElement("div");
          thankYouMessage.className = "thank-you-message";
          thankYouMessage.textContent = "Thank you for taking good care of me";
          document.body.appendChild(thankYouMessage);
        });
      } else {
        renderTasks(tasks, backgroundIndex, selectedCategory);
        if (categoriesHidden) {
          categoriesContainer.classList.add("hidden");
          hideHoverCircles(); // Hide hover circles when categories are hidden
          document.getElementById("welcome-message").classList.add("hidden");
        }
        changeBackgroundWithSlide(
          backgroundSets[selectedCategory][backgroundIndex]
        );
      }
    } else {
      //categoriesContainer.classList.remove("hidden");
      document.getElementById("welcome-message").classList.remove("hidden");
      showHoverCircles(); // Show hover circles in the initial state
      changeBackgroundWithSlide(initialBackground);
    }
  });

  // add alert modal temporarily  so do not put it in the styles.css
  const style = document.createElement('style');
  style.textContent = `
    .alert-modal {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      text-align: center;
      font-size: 16px;
      min-width: 300px;
    }
    .alert-modal.show {
      display: block;
    }
    .close-task-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    }
    .close-task-button:hover {
      color: #333;
    }
  `;
  document.head.appendChild(style);

  // create alert modal
  const alertModal = document.createElement('div');
  alertModal.className = 'alert-modal';
  document.body.appendChild(alertModal);

  // show alert modal
  function showAlert(message, duration = 2000) {
    alertModal.textContent = message;
    alertModal.classList.add('show');
    setTimeout(() => {
      alertModal.classList.remove('show');
      // reset interface state after alert disappears
      showHoverCircles();
      changeBackgroundWithSlide(initialBackground);
      categoriesContainer.classList.remove("hidden");
      document.getElementById("welcome-message").classList.remove("hidden");
      
      // reset all listeners
      removeAllListeners();
      document.querySelectorAll(".deer-circle").forEach(circle => {
        circle.classList.remove("active");
      });
      initializeEventListeners();
    }, duration);
  }

  // check if the same day
  function isSameDay(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  categoriesContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("category-button")) {
      const category = event.target.dataset.category;
      
      // 
      if (category === "weekly") {
        hideHoverCircles();
        // if saved weekly tasks, use them, otherwise generate new tasks
        chrome.storage.local.get("weeklyState", (data) => {
          let tasks;
          if (data.weeklyState && data.weeklyState.tasks) {
            tasks = data.weeklyState.tasks;
          } else {
            tasks = getRandomTasks("weekly").map((task) => ({
              text: task,
              completed: false,
            }));
            // save the new tasks
            chrome.storage.local.set({
              weeklyState: {
                tasks,
                backgroundIndex: 0,
                isFinalImage: false,
              },
            });
          }

          // set the background and render the tasks
          const backgroundIndex = data.weeklyState ? data.weeklyState.backgroundIndex : 0;
          changeBackgroundWithSlide(backgroundSets[category][backgroundIndex]).then(() => {
            renderWeeklyTasks(tasks, backgroundIndex, category);
          });
        });
      } else {
        const result = await new Promise(resolve => {
          chrome.storage.local.get(['dailyCategoryChoice'], resolve);
        });
        
        const now = Date.now();
        if (result.dailyCategoryChoice) {
          const { timestamp, category: chosenCategory } = result.dailyCategoryChoice;
          
          // if the same day and different category, show alert
          if (isSameDay(timestamp, now) && chosenCategory !== category) {
            hideHoverCircles(); 
            showAlert(`You have already chosen ${chosenCategory} today, please choose another category tomorrow`);
            return;
          }
          if (!isSameDay(timestamp, now)) {
            chrome.storage.local.set({
              dailyCategoryChoice: {
                category,
                timestamp: now
              }
            });
          }
        } else {
          chrome.storage.local.set({
            dailyCategoryChoice: {
              category,
              timestamp: now
            }
          });
        }
        
        hideHoverCircles();
        if (category === "others") {
          // Create five empty tasks for the "Others" category
          const tasks = Array(5)
            .fill()
            .map(() => ({
              text: "",
              completed: false,
            }));

          chrome.storage.local.set({
            state: {
              tasks,
              backgroundIndex: 0,
              categoriesHidden: true,
              isFinalImage: false,
              selectedCategory: category,
            },
          });

          // Set the background to the category's origin photo (e.g., A.jpg)
          changeBackgroundWithSlide(backgroundSets[category][0]).then(() => {
            // Render the empty tasks
            renderTasks(tasks, 0, category);
          });
        } else {
          const tasks = hardcodedTasks[category].map((task) => ({
            text: task,
            completed: false,
          }));
          chrome.storage.local.set({
            state: {
              tasks,
              backgroundIndex: 0,
              categoriesHidden: true,
              isFinalImage: false,
              selectedCategory: category,
            },
          });
          // Set the background to the category's origin photo (e.g., A.jpg)
          changeBackgroundWithSlide(backgroundSets[category][0]).then(() => {
            renderTasks(tasks, 0, category);
          });
        }
      }
      
      // special handling for weekly
      if (category !== "weekly") {
        categoriesContainer.classList.add("hidden");
      }
      document.getElementById("welcome-message").classList.add("hidden");
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateSubtasks") {
      const tasks = message.subtasks.map((task) => ({
        text: task,
        completed: false,
      }));
      chrome.storage.local.set({
        state: {
          tasks,
          backgroundIndex: 0,
          categoriesHidden: true,
          isFinalImage: false,
          selectedCategory: "others",
        },
      });
      renderTasks(tasks, 0, "self");
    }
  });

  // Show the reset modal when the reset button is clicked
  resetButton.addEventListener("click", () => {
    resetModal.classList.remove("hidden");
  });

  // Hide the reset modal when "No" is clicked
  resetNoButton.addEventListener("click", () => {
    resetModal.classList.add("hidden");
  });

  // Reset everything when "Yes" is clicked
  resetYesButton.addEventListener("click", () => {
    chrome.storage.local.set({ 
      state: null, 
      mood: null, 
      weeklyState: null,
      dailyCategoryChoice: null  
    }, () => {
      console.log("All states reset to initial state.");
    });

    // reset UI to initial state
    tasksContainer.classList.add("hidden");
    document.getElementById("welcome-message").classList.remove("hidden");
    changeBackgroundWithSlide(initialBackground);

    // remove thank you message if exists
    const thankYouMessage = document.querySelector(".thank-you-message");
    if (thankYouMessage) {
      thankYouMessage.remove();
    }

    // reattach hover listeners
    deerAreas.forEach((area) => {
      const circle = document.getElementById(`${area.id}-circle`);

      const checkHover = (e) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        if (
          mouseX >= area.left &&
          mouseX <= area.left + area.width &&
          mouseY >= area.top &&
          mouseY <= area.top + area.height
        ) {
          circle.classList.add("active");
        } else {
          circle.classList.remove("active");
        }
      };

      const handleClick = (e) => {
        if (!circle.classList.contains("hidden")) {
          const mouseX = e.pageX;
          const mouseY = e.pageY;

          if (
            mouseX >= area.left &&
            mouseX <= area.left + area.width &&
            mouseY >= area.top &&
            mouseY <= area.top + area.height
          ) {
            const categoryButton = document.querySelector(
              `.category-button[data-category="${area.category}"]`
            );
            if (categoryButton) {
              categoryButton.click();
              removeAllListeners();
            }
          }
        }
      };

      document.addEventListener("mousemove", checkHover);
      document.addEventListener("click", handleClick);
      hoverListeners.push(checkHover, handleClick);
      circle.classList.remove("hidden");
    });

    // Hide the reset modal
    resetModal.classList.add("hidden");
  });

  function updateBackgroundState(tasks, selectedCategory) {
    const tasksWithContent = tasks.filter((task) => task.text.trim() !== "");
    const completedTasks = tasks.filter(
      (task) => task.completed && task.text.trim() !== ""
    ).length;
    const totalTasksWithContent = tasksWithContent.length;

    let backgroundIndex;
    let isFinalImage = false;

    if (selectedCategory === "others") {
      // For "others" category, increment background based on completed tasks
      backgroundIndex = Math.min(
        completedTasks,
        backgroundSets[selectedCategory].length - 2
      );

      // Only show final image when ALL tasks with content are completed
      if (
        completedTasks === totalTasksWithContent &&
        totalTasksWithContent > 0
      ) {
        backgroundIndex = backgroundSets[selectedCategory].length - 1;
        isFinalImage = true;
      }
    } else {
      // Original logic for other categories
      if (
        completedTasks === totalTasksWithContent &&
        totalTasksWithContent > 0
      ) {
        backgroundIndex = backgroundSets[selectedCategory].length - 1;
        isFinalImage = true;
      } else {
        backgroundIndex = Math.min(
          completedTasks,
          backgroundSets[selectedCategory].length - 1
        );
      }
    }

    return { backgroundIndex, isFinalImage };
  }

  function sortTasksByCompletion(tasks) {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? -1 : 1;
    });
  }

  function renderTasks(tasks, backgroundIndex, category) {
    const container = tasksContainer;

    const tasksHeader = document.createElement("div");
    tasksHeader.id = "tasks-header";
    tasksHeader.innerHTML = `
      <h1 class="task-title">${category === "weekly" ? "weekly routine" : "today's list"}</h1>
      <p class="task-subtitle">${category === "weekly" ? "tasks to keep you organized" : "some tasks to help you feel good"}</p>
      <button class="close-task-button">❌</button>
    `;

    container.innerHTML = "";
    container.appendChild(tasksHeader);

    const taskList = document.createElement("ul");
    taskList.id = "task-list";
    taskList.className = "task-list";

    const sortedTasks = sortTasksByCompletion(tasks);

    sortedTasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("draggable");
      taskItem.innerHTML = `
        <div class="task-content">
          <input type="checkbox" ${task.completed ? "checked" : ""} />
          <div class="task-text" contenteditable="true" placeholder="New task">${task.text}</div>
        </div>
        ${task.text && !task.completed ? `<button class="delete-task"></button>` : ""}
        <div class="drag-handle">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      `;

      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        const originalIndex = tasks.indexOf(task);
        tasks[originalIndex].completed = checkbox.checked;

        if (tasks[originalIndex].completed) {
          const deleteButton = taskItem.querySelector(".delete-task");
          if (deleteButton) deleteButton.remove();
        }

        const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

        if (isFinalImage) {
          changeBackgroundWithSlide(backgroundSets[category][backgroundSets[category].length - 1]).then(() => {
            container.classList.add("hidden");
            categoriesContainer.classList.add("hidden");
            document.getElementById("welcome-message").classList.add("hidden");
            const thankYouMessage = document.createElement("div");
            thankYouMessage.className = "thank-you-message";
            thankYouMessage.textContent = "Thank you for taking good care of me";
            document.body.appendChild(thankYouMessage);
          });
        } else {
          changeBackgroundWithSlide(backgroundSets[category][newBackgroundIndex]);
        }

        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: newBackgroundIndex,
            categoriesHidden: true,
            isFinalImage,
            selectedCategory: category,
          },
        });

        renderTasks(tasks, newBackgroundIndex, category);
      });

      const taskTextInput = taskItem.querySelector(".task-text");
      taskTextInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          taskTextInput.blur();
        }
      });

      taskTextInput.addEventListener("input", () => {
        const originalIndex = tasks.indexOf(task);
        tasks[originalIndex].text = taskTextInput.textContent;

        const existingDeleteButton = taskItem.querySelector(".delete-task");
        if (tasks[originalIndex].text.trim() !== "" && !tasks[originalIndex].completed && !existingDeleteButton) {
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-task";
          deleteButton.addEventListener("click", () => {
            tasks.splice(originalIndex, 1);
            if (tasks.length < 5) {
              tasks.push({ text: "", completed: false });
            }

            const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

            chrome.storage.local.set({
              state: {
                tasks,
                backgroundIndex: newBackgroundIndex,
                categoriesHidden: true,
                isFinalImage,
                selectedCategory: category,
              },
            });

            renderTasks(tasks, newBackgroundIndex, category);
          });
          taskItem.appendChild(deleteButton);
        }

        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex,
            categoriesHidden: true,
            isFinalImage: false,
            selectedCategory: category,
          },
        });
      });

      // add delete button event listener
      const deleteButton = taskItem.querySelector(".delete-task");
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          tasks.splice(index, 1);
          if (tasks.length < 5) {
            tasks.push({ text: "", completed: false });
          }

          const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

          chrome.storage.local.set({
            state: {
              tasks,
              backgroundIndex: newBackgroundIndex,
              categoriesHidden: true,
              isFinalImage,
              selectedCategory: category,
            },
          });

          renderTasks(tasks, newBackgroundIndex, category);
        });
      }

      taskList.appendChild(taskItem);
    });

    container.appendChild(taskList);
    container.classList.remove("hidden");

    // initialize Sortable
    if (sortableInstance) {
      sortableInstance.destroy();
    }
    sortableInstance = new Sortable(taskList, {
      animation: 600,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      handle: ".drag-handle",
      onUpdate: (evt) => {
        const [movedTask] = tasks.splice(evt.oldIndex, 1);
        tasks.splice(evt.newIndex, 0, movedTask);

        const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: newBackgroundIndex,
            categoriesHidden: true,
            isFinalImage,
            selectedCategory: category,
          },
        });
      },
    });

    const closeButton = container.querySelector(".close-task-button");
    closeButton.addEventListener("click", () => {
      // hide current container first
      container.classList.add("hidden");
      
      // restore background
      changeBackgroundWithSlide(initialBackground).then(() => {
        // show all interface elements
        showHoverCircles();
        categoriesContainer.classList.remove("hidden");
        document.getElementById("welcome-message").classList.remove("hidden");
        
        // reset all event listeners
        removeAllListeners();
        document.querySelectorAll(".deer-circle").forEach(circle => {
          circle.classList.remove("active");
        });
        
        // reinitialize event listeners
        initializeEventListeners();
        
        // reset task list state
        container.innerHTML = "";
        
        // remove thank you message if exists
        const thankYouMessage = document.querySelector(".thank-you-message");
        if (thankYouMessage) {
          thankYouMessage.remove();
        }
      });
    });
  }

  // special handling for weekly
  function renderWeeklyTasks(tasks, backgroundIndex, category) {
    const weeklyContainer = document.getElementById("tasks-container") || document.createElement("div");
    weeklyContainer.id = "tasks-container";
    if (!weeklyContainer.parentElement) {
      document.body.appendChild(weeklyContainer);
    }

    const tasksHeader = document.createElement("div");
    tasksHeader.id = "tasks-header";
    tasksHeader.innerHTML = `
      <h1 class="task-title">weekly routine</h1>
      <p class="task-subtitle">tasks to keep you organized</p>
      <button class="close-task-button">❌</button>
    `;

    weeklyContainer.innerHTML = "";
    weeklyContainer.appendChild(tasksHeader);

    const taskList = document.createElement("ul");
    taskList.id = "task-list";
    taskList.className = "task-list";

    const sortedTasks = sortTasksByCompletion(tasks);

    sortedTasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("draggable");
      taskItem.innerHTML = `
        <div class="task-content">
          <input type="checkbox" ${task.completed ? "checked" : ""} />
          <div class="task-text">${task.text}</div>
        </div>
        ${task.text && !task.completed ? `<button class="delete-task"></button>` : ""}
        <div class="drag-handle">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      `;

      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        const originalIndex = tasks.indexOf(task);
        tasks[originalIndex].completed = checkbox.checked;

        if (tasks[originalIndex].completed) {
          const deleteButton = taskItem.querySelector(".delete-task");
          if (deleteButton) deleteButton.remove();
        }

        const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

        if (isFinalImage) {
          changeBackgroundWithSlide(backgroundSets[category][backgroundSets[category].length - 1]).then(() => {
            weeklyContainer.classList.add("hidden");
            const thankYouMessage = document.createElement("div");
            thankYouMessage.className = "thank-you-message";
            thankYouMessage.textContent = "Thank you for taking good care of me";
            document.body.appendChild(thankYouMessage);
          });
        } else {
          changeBackgroundWithSlide(backgroundSets[category][newBackgroundIndex]);
        }

        chrome.storage.local.set({
          weeklyState: {
            tasks,
            backgroundIndex: newBackgroundIndex,
            isFinalImage,
          },
        });

        renderWeeklyTasks(tasks, newBackgroundIndex, category);
      });

      // add delete button event listener
      const deleteButton = taskItem.querySelector(".delete-task");
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          const originalIndex = tasks.indexOf(task);
          tasks.splice(originalIndex, 1);
          
          // get current task texts
          const currentTaskTexts = tasks.map(t => t.text);
          
          // filter out unused tasks from weekly task pool
          const unusedTasks = taskPool.weekly.filter(task => !currentTaskTexts.includes(task));
          
          // if there are unused tasks, randomly select one; if all used, start over with original task pool
          let newTaskText;
          if (unusedTasks.length > 0) {
            const randomIndex = Math.floor(Math.random() * unusedTasks.length);
            newTaskText = unusedTasks[randomIndex];
          } else {
            // if all tasks used, show prompt and use original task pool randomly select
            showAlert("All weekly tasks have been used, starting over!", 2000);
            const randomIndex = Math.floor(Math.random() * taskPool.weekly.length);
            newTaskText = taskPool.weekly[randomIndex];
          }
          
          // add new task
          tasks.push({
            text: newTaskText,
            completed: false
          });

          const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

          chrome.storage.local.set({
            weeklyState: {
              tasks,
              backgroundIndex: newBackgroundIndex,
              isFinalImage,
            },
          });

          renderWeeklyTasks(tasks, newBackgroundIndex, category);
        });
      }

      taskList.appendChild(taskItem);
    });

    weeklyContainer.appendChild(taskList);
    weeklyContainer.classList.remove("hidden");

    // initialize Sortable
    if (sortableInstance) {
      sortableInstance.destroy();
    }
    sortableInstance = new Sortable(taskList, {
      animation: 600,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      handle: ".drag-handle",
      onUpdate: (evt) => {
        const [movedTask] = tasks.splice(evt.oldIndex, 1);
        tasks.splice(evt.newIndex, 0, movedTask);

        const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);

        chrome.storage.local.set({
          weeklyState: {
            tasks,
            backgroundIndex: newBackgroundIndex,
            isFinalImage,
          },
        });
      },
    });

    const closeButton = weeklyContainer.querySelector(".close-task-button");
    closeButton.addEventListener("click", () => {
      weeklyContainer.classList.add("hidden");
      showHoverCircles();
      changeBackgroundWithSlide(initialBackground).then(() => {
        categoriesContainer.classList.remove("hidden");
        document.getElementById("welcome-message").classList.remove("hidden");
        
        removeAllListeners();
        document.querySelectorAll(".deer-circle").forEach(circle => {
          circle.classList.remove("active");
        });
        initializeEventListeners();
      });
    });
  }

  // 加载weekly状态
  chrome.storage.local.get("weeklyState", (data) => {
    if (data.weeklyState) {
      const { tasks, backgroundIndex, isFinalImage } = data.weeklyState;
      if (isFinalImage) {
        changeBackgroundWithSlide(backgroundSets["weekly"][backgroundSets["weekly"].length - 1]);
      } else if (document.getElementById("weekly-tasks-container")) {
        renderWeeklyTasks(tasks, backgroundIndex, "weekly");
      }
    }
  });

  const moodButton = document.getElementById("mood-button");
  const moodModal = document.getElementById("mood-modal");
  const moodOptions = document.querySelectorAll(".mood-option");

  // 添加mood-button的悬停检测
  const moodArea = {
    top: 20,
    left: 40, // 230px宽度 + 40px右边距
    width: 230,
    height: 140
  };

  const checkMoodHover = (e) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    if (
      mouseX >= moodArea.left &&
      mouseX <= moodArea.left + moodArea.width &&
      mouseY >= moodArea.top &&
      mouseY <= moodArea.top + moodArea.height
    ) {
      moodButton.classList.add("active");
    } else {
      moodButton.classList.remove("active");
    }
  };

  document.addEventListener("mousemove", checkMoodHover);
  hoverListeners.push(checkMoodHover);

  // get the current mood
  chrome.storage.local.get("mood", (data) => {
    if (data.mood) {
      updateMoodButton(data.mood);
    }
  });
  moodButton.addEventListener("click", () => {
    chrome.storage.local.get("mood", (data) => {
      if (data.mood) {
        const modalTitle = moodModal.querySelector("h2");
        modalTitle.textContent = `You feel ${data.mood.charAt(0).toUpperCase() + data.mood.slice(1)} today`;
        
        // hide all options
        moodOptions.forEach(option => {
          option.classList.add("hidden");
        });
        
        // after choice, show the selected option and make it larger
        const selectedOption = Array.from(moodOptions).find(option => option.dataset.mood === data.mood);
        if (selectedOption) {
          selectedOption.classList.remove("hidden");
          selectedOption.classList.add("selected-large");
        }
      } else {
        const modalTitle = moodModal.querySelector("h2");
        modalTitle.textContent = "How are you feeling today?";
        
        // show all options
        moodOptions.forEach(option => {
          option.classList.remove("hidden");
          option.classList.remove("selected-large");
        });
      }
    });
    
    moodModal.classList.remove("hidden");
  });

  // click outside the modal to close
  moodModal.addEventListener("click", (e) => {
    if (e.target === moodModal) {
      moodModal.classList.add("hidden");
    }
  });

  // handle the mood selection
  moodOptions.forEach(option => {
    option.addEventListener("click", () => {
      const selectedMood = option.dataset.mood;
      
      // save the selected mood
      chrome.storage.local.set({ mood: selectedMood }, () => {
        updateMoodButton(selectedMood);
        moodModal.classList.add("hidden");
      });
    });
  });

  // update the mood button
  function updateMoodButton(mood) {
    const buttonIcon = moodButton.querySelector("img");
    
    // update the alt text
    buttonIcon.alt = mood.charAt(0).toUpperCase() + mood.slice(1);
  }

  // 在文件开头附近添加这个函数
  function initializeEventListeners() {
    deerAreas.forEach((area) => {
      const circle = document.getElementById(`${area.id}-circle`);
      
      const checkHover = (e) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        if (
          mouseX >= area.left &&
          mouseX <= area.left + area.width &&
          mouseY >= area.top &&
          mouseY <= area.top + area.height
        ) {
          circle.classList.add("active");
        } else {
          circle.classList.remove("active");
        }
      };

      const handleClick = (e) => {
        if (!circle.classList.contains("hidden")) {
          const mouseX = e.pageX;
          const mouseY = e.pageY;

          if (
            mouseX >= area.left &&
            mouseX <= area.left + area.width &&
            mouseY >= area.top &&
            mouseY <= area.top + area.height
          ) {
            const categoryButton = document.querySelector(
              `.category-button[data-category="${area.category}"]`
            );
            if (categoryButton) {
              categoryButton.click();
              removeAllListeners();
            }
          }
        }
      };

      document.addEventListener("mousemove", checkHover);
      document.addEventListener("click", handleClick);
      hoverListeners.push(checkHover, handleClick);
    });

    // 重新初始化mood按钮的事件监听
    const checkMoodHover = (e) => {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      if (
        mouseX >= moodArea.left &&
        mouseX <= moodArea.left + moodArea.width &&
        mouseY >= moodArea.top &&
        mouseY <= moodArea.top + moodArea.height
      ) {
        moodButton.classList.add("active");
      } else {
        moodButton.classList.remove("active");
      }
    };

    document.addEventListener("mousemove", checkMoodHover);
    hoverListeners.push(checkMoodHover);
  }
});
