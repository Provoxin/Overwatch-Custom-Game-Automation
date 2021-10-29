using System.Drawing;
using System.Threading.Tasks;

namespace Deltin.CustomGameAutomation
{
    partial class CustomGame
    {
        /// <summary>
        /// Chat error detection for Overwatch.
        /// </summary>
        public ChatError ChatError { get; private set; }
    }

    /// <summary>
    /// Chat error detection for Overwatch.
    /// </summary>
    /// <remarks>
    /// The ChatError class is accessed in a CustomGame object on the <see cref="CustomGame.ChatError"/> field.
    /// </remarks>
    public class ChatError : CustomGameBase
    {
        internal ChatError(CustomGame cg) : base(cg) { }

        internal static readonly int[] ErrorColor = new int[] { 160, 94, 96 }; // Red color of error messages.
        
        private const int MarkerX = 50; // The X location of the chat marker.

        // The possible Y locations of the chat marker, which is moved upwards for multi-line chat entries.
        private static readonly int[] markerYs =
        {
            // One line error
            483,
            // Two line error
            472,
            // Three line error
            463,
            // Four line error
            453
        };


        /// <summary>
        /// Checks for an error in the chat.
        /// </summary>
        /// <param name="lines">How many lines the error has. 0 to check all possible lengths.</param>
        /// <returns>Returns true if the latest message in the chat is an error.</returns>
        public bool LastMessageIsError(int lines = 0)
        {
            using (cg.LockHandler.Passive)
            {
                cg.UpdateScreen();
                if (lines > 0)
                {
                    return Capture.CompareColor(new Point(MarkerX, markerYs[lines-1]), ErrorColor, 20);
                }
                
                foreach (int markerY in markerYs)
                {
                    if (Capture.CompareColor(new Point(MarkerX, markerY), ErrorColor, 20)) return true;
                }
                return false;
            }
        }

        /// <summary>
        /// Waits until an error to appear in the chat.
        /// </summary>
        /// <param name="timeout">How long to check for an error, in milliseconds. -1 for no timeout.</param>
        /// <param name="interval">How often to check for an error, in milliseconds.</param>
        /// <param name="lines">How many lines the error has. 0 to check all possible lengths.</param>
        /// <returns>Returns true if an error appears before timeout.</returns>
        public bool WaitForError(int timeout = -1, int interval = 10, int lines = 0)
        {
            bool notTimedOut = true;
            var errorWaitTask = Task.Run(async () =>
            {
                while (!LastMessageIsError(lines) && notTimedOut) { await Task.Delay(interval); };
            });
            notTimedOut = errorWaitTask.Wait(timeout);
            return notTimedOut;
        }
    }
}