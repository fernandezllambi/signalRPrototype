using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Prototype.Hubs
{
    public class SquareGameHub : Hub
    {
        private SquareState[][] matrix;
        public SquareGameHub()
        {
            PopulateInitialMatrix();
        }


        public async Task AssignSquare(string name, int x, int y)
        {
            matrix[x][y].Owner = name;
            await Clients.All.SendAsync("assignSquare", matrix);
        }

        public async Task GetSquare()
        {
            await Clients.All.SendAsync("getSquare", matrix);
        }

        private void PopulateInitialMatrix()
        {
            matrix = new SquareState[10][];

            for (int i = 0; i < 10; i++)
            {
                matrix[i] = new SquareState[10];

                for (int j = 0; j < 10; j++)
                {
                    matrix[i][j] = new SquareState { Owner = "" };
                }
            }
        }
    }

    public class SquareState
    {
        public string Owner { get; set; }
    }
}
