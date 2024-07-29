#include <bits/stdc++.h>

using namespace std;

const int BOARD_SIZE = 8;
const int NUM_PIECES = 13;
const int TOTAL_SOLUTIONS = 340;
const int dx[] = {0, 1, 0, -1};
const int dy[] = {1, 0, -1, 0};
const int d = 4;

using PiecePart = pair<int, int>; // (y, x) coordinates
using PieceConfig = vector<PiecePart>; // all coordinates of a piece configuration
using Piece = pair<int, vector<PieceConfig>>; // (piece index, all configurations of the piece)

using PieceState = tuple<int, int, int>; // (piece index, piece configuration index, y, x)
using PieceSolution = array<PieceState, NUM_PIECES>;
vector<PieceSolution> solutions;

const vector<Piece> PIECE_INFO = {
    {
        // Piece 0
        0,
        {
            {{0, 0}, {0, 1}, {1, 0}, {1, 1}}, 
            {{0, -1}, {0, 0}, {1, -1}, {1, 0}}
        }
    },
    {
        // Piece 2
        2,
        {
            {{0, 0}, {1, -1}, {1, 0}, {1, 1}, {2, 0}}
        }
    },
    {
        // Piece 5
        5,
        {
            {{0, -1}, {0, 0}, {0, 1}, {0, 2}, {0, 3}}, 
            {{-3, 0}, {-2, 0}, {-1, 0}, {0, 0}, {1, 0}}
        }
    },
    {
        // Piece 1
        1,
        {
            {{0, 0}, {0, 1}, {0, 2}, {1, 0}, {1, 2}}, 
            {{-2, 0}, {-2, 1}, {-1, 0}, {0, 0}, {0, 1}},
            {{-2, -1}, {-2, 0}, {-1, 0}, {0, -1}, {0, 0}},
            {{-1, -2}, {-1, 0}, {0, -2}, {0, -1}, {0, 0}}
        }
    },
    {
        // Piece 8
        8,
        {
            {{0, 0}, {0, 1}, {1, -1}, {1, 0}, {2, -1}},
            {{0, -1}, {0, 0}, {1, 0}, {1, 1}, {2, 1}},
            {{-1, 0}, {0, 0}, {0, 1}, {1, 1}, {1, 2}},
            {{-1, 0}, {0, -1}, {0, 0}, {1, -2}, {1, -1}}
        }
    },
    {
        // Piece 7
        7,
        {
            {{-1, 0}, {0, 0}, {0, 1}, {0, 2}, {1, 0}},
            {{-1, 0}, {0, -2}, {0, -1}, {0, 0}, {1, 0}},
            {{-2, 0}, {-1, 0}, {0, -1}, {0, 0}, {0, 1}},
            {{0, -1}, {0, 0}, {0, 1}, {1, 0}, {2, 0}}
        }
    },
    {
        // Piece 9
        9,
        {
            {{-1, -1}, {-1, 0}, {0, 0}, {1, 0}, {1, 1}},
            {{-1, 0}, {-1, 1}, {0, 0}, {1, -1}, {1, 0}},
            {{-1, 1}, {0, -1}, {0, 0}, {0, 1}, {1, -1}},
            {{-1, -1}, {0, -1}, {0, 0}, {0, 1}, {1, 1}}
        }
    },
    {
        // Piece 10
        10,
        {
            {{-2, 0}, {-1, 0}, {0, -2}, {0, -1}, {0, 0}},
            {{-2, 0}, {-1, 0}, {0, 0}, {0, 1}, {0, 2}},
            {{0, -2}, {0, -1}, {0, 0}, {1, 0}, {2, 0}},
            {{0, 0}, {0, 1}, {0, 2}, {1, 0}, {2, 0}}
        }
    },
    {
        // Piece 3
        3,
        {
            {{0, -1}, {0, 0}, {0, 1}, {1, -1}, {1, 0}}, 
            {{0, -1}, {0, 0}, {0, 1}, {1, 0}, {1, 1}},
            {{-1, 0}, {0, 0}, {0, 1}, {1, 0}, {1, 1}},
            {{-1, 0}, {0, -1}, {0, 0}, {1, -1}, {1, 0}},
            {{-1, 0}, {-1, 1}, {0, -1}, {0, 0}, {0, 1}},
            {{-1, -1}, {-1, 0}, {0, -1}, {0, 0}, {0, 1}},
            {{-1, -1}, {-1, 0}, {0, -1}, {0, 0}, {1, 0}},
            {{-1, 0}, {-1, 1}, {0, 0}, {0, 1}, {1, 0}}
        }
    },
    {
        // Piece 4
        4,
        {
            {{-2, 1}, {-1, 1}, {0, 0}, {0, 1}, {1, 0}}, 
            {{-2, -1}, {-1, -1}, {0, -1}, {0, 0}, {1, 0}},
            {{-1, -2}, {-1, -1}, {-1, 0}, {0, 0}, {0, 1}},
            {{-1, 0}, {-1, 1}, {-1, 2}, {0, -1}, {0, 0}},
            {{-1, 0}, {0, -1}, {0, 0}, {1, -1}, {2, -1}},
            {{-1, 0}, {0, 0}, {0, 1}, {1, 1}, {2, 1}},
            {{0, -1}, {0, 0}, {1, 0}, {1, 1}, {1, 2}},
            {{0, 0}, {0, 1}, {1, -2}, {1, -1}, {1, 0}}
        }
    },
    {
        // Piece 6
        6,
        {
            {{-1, 1}, {0, -1}, {0, 0}, {0, 1}, {0, 2}},
            {{-1, -1}, {0, -2}, {0, -1}, {0, 0}, {0, 1}},
            {{-2, 0}, {-1, -1}, {-1, 0}, {0, 0}, {1, 0}},
            {{-2, 0}, {-1, 0}, {-1, 1}, {0, 0}, {1, 0}},
            {{0, -2}, {0, -1}, {0, 0}, {0, 1}, {1, -1}},
            {{0, -1}, {0, 0}, {0, 1}, {0, 2}, {1, 1}},
            {{-1, 0}, {0, 0}, {1, 0}, {1, 1}, {2, 0}},
            {{-1, 0}, {0, 0}, {1, -1}, {1, 0}, {2, 0}}
        }
    },
    {
        // Piece 11
        11,
        {
            {{-1, 0}, {0, 0}, {0, 1}, {1, -1}, {1, 0}},
            {{-1, 0}, {0, -1}, {0, 0}, {1, 0}, {1, 1}},
            {{-1, 0}, {0, -1}, {0, 0}, {0, 1}, {1, 1}},
            {{-1, 0}, {0, -1}, {0, 0}, {0, 1}, {1, -1}},
            {{-1, 0}, {-1, 1}, {0, -1}, {0, 0}, {1, 0}},
            {{-1, -1}, {-1, 0}, {0, 0}, {0, 1}, {1, 0}},
            {{-1, -1}, {0, -1}, {0, 0}, {0, 1}, {1, 0}},
            {{-1, 1}, {0, -1}, {0, 0}, {0, 1}, {1, 0}}
        }
    },
    {
        // Piece 12
        12,
        {
            {{-1, 1}, {0, -2}, {0, -1}, {0, 0}, {0, 1}},
            {{-1, -1}, {0, -1}, {0, 0}, {0, 1}, {0, 2}},
            {{-1, -1}, {-1, 0}, {0, 0}, {1, 0}, {2, 0}},
            {{-1, 0}, {-1, 1}, {0, 0}, {1, 0}, {2, 0}},
            {{0, -1}, {0, 0}, {0, 1}, {0, 2}, {1, -1}},
            {{0, -2}, {0, -1}, {0, 0}, {0, 1}, {1, 1}},
            {{-2, 0}, {-1, 0}, {0, 0}, {1, 0}, {1, 1}},
            {{-2, 0}, {-1, 0}, {0, 0}, {1, -1}, {1, 0}}
        }
    }
};

bool isValid(const vector<vector<bool>>& board, const PieceConfig& piece, int y, int x) {
    // Can only place the piece on even-parity cells
    if ((y + x) % 2 == 1) {
        return false;
    }
    for (const auto& part : piece) {
        int ny = y + part.first;
        int nx = x + part.second;
        if (ny < 0 || ny >= BOARD_SIZE || nx < 0 || nx >= BOARD_SIZE || board[ny][nx]) {
            return false;
        }
    }
    return true;
}

bool isBad(const vector<vector<bool>>& board) {
    // Check that the board does not have any connected regions of size not divisible by 5 for early pruning
    vector<vector<bool>> visited(BOARD_SIZE, vector<bool>(BOARD_SIZE, false));
    int cnt = 0;
    function<void(int, int)> dfs = [&](int y, int x) {
        visited[y][x] = true;
        cnt++;
        // Flood fill in 4 directions
        for (int k = 0; k < d; ++k) {
            int ny = y + dy[k];
            int nx = x + dx[k];
            if (ny >= 0 && ny < BOARD_SIZE && nx >= 0 && nx < BOARD_SIZE && !visited[ny][nx] && !board[ny][nx]) {
                dfs(ny, nx);
            }
        }
    };
    for (int i = 0; i < BOARD_SIZE; ++i) {
        for (int j = 0; j < BOARD_SIZE; ++j) {
            if (!visited[i][j] && !board[i][j]) {
                dfs(i, j);
                if (cnt % 5) {
                    return true;
                }
                cnt = 0;
            }
        }
    }
    return false;
}

void placePiece(vector<vector<bool>>& board, const PieceConfig& piece, int y, int x, int pieceState, int pieceIndex, PieceSolution& solution) {
    for (const auto& part : piece) {
        board[y + part.first][x + part.second] = true;
    }
    solution[pieceIndex] = make_tuple(pieceState, y, x);
}

void removePiece(vector<vector<bool>>& board, const PieceConfig& piece, int y, int x, int pieceState, int pieceIndex, PieceSolution& solution) {
    for (const auto& part : piece) {
        board[y + part.first][x + part.second] = false;
    }
}

void printBoard(const vector<vector<bool>>& board) {
    for (const auto& row : board) {
        for (const auto& cell : row) {
            cout << (cell ? '#' : '.') << ' ';
        }
        cout << '\n';
    }
}

void backtrack(vector<vector<bool>>& board, int index, PieceSolution& solution) {
    if (index == NUM_PIECES) {
        solutions.push_back(solution);
        cout << solutions.size() << '\n';
        return;
    }

    const Piece& piece = PIECE_INFO[index];
    for (int i = 0; i < piece.second.size(); ++i) {
        const PieceConfig &config = piece.second[i];
        for (int y = 0; y < BOARD_SIZE; ++y) {
            for (int x = 0; x < BOARD_SIZE; ++x) {
                if (isValid(board, config, y, x)) {
                    placePiece(board, config, y, x, i, piece.first, solution);
                    if (isBad(board)) {
                        removePiece(board, config, y, x, i, piece.first, solution);
                        continue;
                    }
                    backtrack(board, index + 1, solution);
                    removePiece(board, config, y, x, i, piece.first, solution);
                }
            }
        }
    }
}

int main() {
    vector<vector<bool>> board(BOARD_SIZE, vector<bool>(BOARD_SIZE, false));
    PieceSolution solution;
    backtrack(board, 0, solution);

    // for (const auto& solution : solutions) {
    //     cout << "Solution:\n";
    //     for (int i = 0; i < NUM_PIECES; ++i) {
    //         auto [pieceState, y, x] = solution[i];
    //         cout << "Piece " << i << " is placed at: " << y << ", " << x << " with configuration: " << pieceState << '\n';
    //     }
    //     cout << '\n';
    // }

    // Print solutions to file
    ofstream out("solutions.txt");
    for (const auto& solution : solutions) {
        for (int i = 0; i < NUM_PIECES; ++i) {
            auto [pieceState, y, x] = solution[i];
            out << pieceState << ' ' << y << ' ' << x << ' ';
        }
        out << '\n';
    }

    return 0;
}
