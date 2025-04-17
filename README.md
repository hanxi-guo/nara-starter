
# CIS 3500: Nara Extension Enhancement

## Overview
This project is part of an enhancement assignment based on **Nara**, a Chrome extension originally developed by one of the Top 3 winners of the MCIT Hackathon. Nara helps users manage tasks and reminders in a visually engaging way.

The goal of this assignment was to extend Nara's functionality by implementing additional features that improve the user experience and encourage positive habits.

---

## Implemented Enhancements

### ✅ Mood Selection Prompt
We added a daily mood selection feature that allows users to log their emotional state with a simple click. Users can choose from several mood icons (e.g., happy, tried, neutral), which are stored for daily tracking. This promotes emotional awareness.

**Highlights:**
- User-friendly icons with hover tooltips.
- One-click mood logging per day.
- Mood state is visually displayed for the current day.

### ✅ Rotating Weekly Challenge
To motivate users further, we introduced a rotating weekly challenge system. Each week, a new mini-challenge is presented—such as “Take a 10-minute walk daily” or “Drink 8 glasses of water.” Users can check off these items as they go, helping them build positive routines.

**Highlights:**
- Automatic weekly challenge rotation from a pre-defined list.
- Interactive checkboxes to track daily completion.
- Challenge states are saved persistently throughout the week.


---

## Challenges Faced

- Ensuring smooth integration with the existing codebase, especially when modifying shared state between components.
- Designing UI components to be lightweight yet visually engaging, without disrupting the user's task flow.

---

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/nara-extension-starter.git
   ```
2. Open `chrome://extensions` in Chrome and enable **Developer Mode**.
3. Click **Load unpacked** and select the project folder.
4. Open a new tab to view the extension in action.

---

## Credits
Built by Hanxi Guo and team as part of the Spring 2025 CIS 3500 coursework.  
Original project by the MCIT Hackathon Top 3 team.
