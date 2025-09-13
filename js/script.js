document.addEventListener("DOMContentLoaded", () => {
  // Mood Tracker Function (Add today's mood to row)
  function moodTracking() {
    const dropdownItems = document.querySelectorAll(".mood-select-option");
    if (!dropdownItems.length) return; // Prevents functions from running on all pages

    dropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedMood = item.textContent.trim().split(" ")[0];

        const selectMoodGroup = document.createElement("div");
        selectMoodGroup.className = "col";

        const selectedMoodEmoji = document.createElement("h1");
        selectedMoodEmoji.textContent = selectedMood;

        const day = document.createElement("p");
        day.textContent = "Today";

        selectMoodGroup.appendChild(selectedMoodEmoji);
        selectMoodGroup.appendChild(day);

        const moodTrackingContainer = document.getElementById(
          "mood-tracking-container"
        );
        if (!moodTrackingContainer || !moodTrackingContainer.lastElementChild)
          return;

        moodTrackingContainer.insertBefore(
          selectMoodGroup,
          moodTrackingContainer.lastElementChild
        );
        moodTrackingContainer.lastElementChild.remove();
      });
    });
  }

  // Booking Date Function (Can only book future dates)
  function bookAICoachDate() {
    const bookingDate = document.getElementById("booking-date");
    if (!bookingDate) return;

    let todaysDate = new Date();
    const yyyy = todaysDate.getFullYear();
    const mm = String(todaysDate.getMonth() + 1).padStart(2, "0");
    const dd = String(todaysDate.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    bookingDate.setAttribute("min", formattedDate);
  }

  // Booking Coach Function (Prevent default submission and show alert block)
  function bookAICoach() {
    const bookAiCoachForm = document.getElementById("book-ai-coach-form");
    const bookAiCoachAlert = document.getElementById("book-ai-coach-alert");
    if (!bookAiCoachForm || !bookAiCoachAlert) return;

    bookAiCoachForm.addEventListener("submit", (event) => {
      event.preventDefault();
      bookAiCoachAlert.style.display = "block";
      bookAiCoachForm.reset();
    });
  }

  // Pick Tier Function (Make selected button yellow)
  function pickTier() {
    const priceCardBtns = document.querySelectorAll(".tier-card-btn");
    if (!priceCardBtns.length) return;

    priceCardBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        priceCardBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  }

  // Create Post Function (Structure for a community post)
  function createPost(postText) {
    const card = document.createElement("div");
    card.className = "card border-primary mb-3 w-100";
    card.style.maxWidth = "600px";

    card.innerHTML = `
      <div class="card-header post-header">You • Now</div>
      <div class="card-body">
        <p class="card-text">${postText}</p>
      </div>
    `;
    return card;
  }

  // Add Post Function (Add a community post to page)
  function addPost() {
    const addPostForm = document.getElementById("add-post-form");
    const postsContainer = document.getElementById("posts-container");
    if (!addPostForm || !postsContainer) return;

    addPostForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const postText = document.getElementById("postContent").value;
      if (!postText.trim()) return;

      const newPost = createPost(postText);
      postsContainer.prepend(newPost);
      addPostForm.reset();
    });
  }

  // Chat Bot Function (Select buttons and reset)
  function chatBot() {
    const startCBT = document.getElementById("start-cbt");
    const feelingDown = document.getElementById("feeling-down");
    const needAdvice = document.getElementById("need-advice");
    const miyaResponse = document.getElementById("miya-response");
    const chatModal = document.getElementById("chat-bot");
    const chatButtons = document.getElementById("chat-buttons");

    if (!startCBT || !feelingDown || !needAdvice || !miyaResponse) return;

    startCBT.addEventListener("click", () => {
      miyaResponse.innerText = "Starting CBT";
      startCBT.hidden = true;
      feelingDown.hidden = true;
      needAdvice.hidden = true;
    });

    feelingDown.addEventListener("click", () => {
      miyaResponse.innerText = "What has you feeling this way?";
      startCBT.hidden = true;
      feelingDown.hidden = true;
      needAdvice.hidden = true;
    });

    needAdvice.addEventListener("click", () => {
      miyaResponse.innerText = "Tell me more about your situation...";
      startCBT.hidden = true;
      feelingDown.hidden = true;
      needAdvice.hidden = true;
    });

    chatModal.addEventListener("hidden.bs.modal", () => {
      miyaResponse.innerText = "";
      startCBT.hidden = false;
      feelingDown.hidden = false;
      needAdvice.hidden = false;
    });
  }

  // Initialisation Of Functions
  const functions = [
    addPost,
    pickTier,
    moodTracking,
    bookAICoachDate,
    bookAICoach,
    chatBot,
  ];
  functions.forEach((init) => init());
});
