# Mini Dragable Player

"Seasat Player" is a mini-player for video streaming with drag-and-drop functionality and a fullscreen toggle. Built with React, TypeScript, Vite, and styled using Tailwind CSS, this project demonstrates how to create an interactive and responsive video player component.


![seasats-example](./example.gif)

## Getting Started

### Prerequisites
- **Node.js:** Version 16 or later is recommended.
- **Package Manager:** npm or yarn.

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/BryanAM/seasat-player.git
   cd seasat-player
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn
   ```

### Running the Application
- **Development Server:**
  ```bash
  npm run dev
  ```
  This starts the Vite development server. Open your browser at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite).

- **Production Build:**
  ```bash
  npm run build
  ```

- **Deployment:**
  The deployment script uses [Surge](https://surge.sh/):
  ```bash
  npm run deploy
  ```
  *(Make sure you have Surge installed globally with `npm install --global surge`.) AND you define the custom-domain in package.json $CUSTOM_DOMAIN*

## Defining Important Parts and How They Work

### App.tsx
- **Purpose:**  
  Serves as the main entry point. It sets up the page layout and provides the necessary props to the `Video` component.
- **Key Functionality:**
  - Manages video dimensions using React state.
  - Uses the custom `useDraggable` hook to enable dragging functionality and handle window resizing.
  - Integrates the `Navigation` component (for additional navigation if needed).

### Video Component (video.tsx)
- **Purpose:**  
  Renders the mini-player that displays an iframe-based video.
- **Key Functionality:**
  - **Fullscreen Toggle:**  
    The component toggles between fullscreen and draggable modes. When toggled:
    - It calls `lockPosition`/`unlockPosition` to control draggable behavior.
    - It resets the video coordinates when entering fullscreen (or repositions when exiting).
  - **Event Handling:**  
    Uses `onPointerDown` to stop event propagation (so that the fullscreen button doesn’t trigger drag events).
  - **Styling:**  
    Uses inline styles combined with Tailwind CSS classes to adjust the layout and appearance depending on state (e.g., fullscreen mode).

### useDraggable Hook (useDraggable.ts)
- **Purpose:**  
  Provides the logic for dragging the video player around the viewport.
- **Key Functionality:**
  - **Coordinates Management:**  
    Tracks and updates the position (x, y) of the video player using React state.
  - **Event Listeners:**  
    Attaches global pointer event listeners to handle pointer down, move, and up events for drag functionality.
  - **Resize Handling:**  
    Adjusts the position of the player when the window is resized, except when the player is in fullscreen mode.
  - **Fullscreen Locking:**  
    Exposes functions (`lockPosition` and `unlockPosition`) to disable or enable dragging during fullscreen.

## Made With & Tooling

- **React & React-DOM:** Core libraries for building the user interface.
- **TypeScript:** Provides static type-checking for robust development.
- **Vite:** Fast development server and build tool.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Lucide React:** Library for SVG icons.
- **ESLint:** For linting and maintaining code quality.
- **Surge:** For simple static site deployment.
- 

## Notable Points

- **Draggable & Fullscreen Integration:**  
  The mini-player supports both drag-and-drop movement and fullscreen mode. The code ensures that the two functionalities don't conflict by using a lock mechanism and by carefully managing pointer events.

- **Global Event Management:**  
  The `useDraggable` hook attaches global event listeners (pointer events) to ensure that dragging works across the entire viewport. Care is taken to avoid interfering with component-specific events (e.g., by stopping propagation on the fullscreen button).

- **Responsive Behavior:**  
  The player automatically repositions itself when the window is resized, ensuring it stays within the bounds of the viewport unless in fullscreen mode.

- **Modular Design:**  
  - **Components:** Each component (App, Video, Navigation) has a well-defined responsibility.
  - **Hooks:** Custom hooks like `useDraggable` encapsulate logic that can be reused or extended in the future.

- **State Updates & Timing:**  
  The code handles state updates (like repositioning on resize) carefully, using techniques like deferred updates (e.g., via `setTimeout` or `useEffect`) to avoid React warnings/errors about updating state during render.

  
- **Testing:**
    - Spot testing on Chrome, Safari & mobile devices
    - For more robust testing for your usecase I recommend integration testing.

## Final Notes

This project serves as a practical example of combining interactive UI features (dragging and fullscreen) with responsive design principles. Whether you're learning how to create dynamic components in React or looking for a starting point for a custom video player, this codebase provides a clear, modular foundation.

Feel free to open issues or contribute if you have suggestions or improvements!
