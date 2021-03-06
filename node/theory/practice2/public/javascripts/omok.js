const omok = document.querySelector("#omok");
        const ctx = omok.getContext("2d");

        const cellSize = 40;
        const offsetX = 40;
        const offsetY = 40;
        const stoneRadius = 17;

        let lines = [];
        let clicked = false;
        let myTurn = true;
        let myConfig = {
            stoneColor: {
                player1: '#f8faf5',
                player2: '#121212'
            },
            boardColor: '#FFE4B5'
            // my stone color; player2 stone color; ...
        }
        let stoneColor = myConfig['stoneColor']['player1'];
        // canvas의 크기만큼 cell을 채운다.
        // cell을 채울 때 정보를 저장한다. {x: i, y: j, centerX: something, centerY: something isOccupied: false}
        // 바둑알을 놓을 때 mouse offSet의 위치에 따라 자동으로 보정하는 함수를 만든다.
        // 바둑알을 놓았을 때 주변을 확인하여 연속된 type이 있는지 확인한다. (가로, 세로, 대각선)

        function Cell(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
        }

        function Stone(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
        }

        Cell.prototype.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = myConfig['boardColor'];
            ctx.rect(this.x, this.y, this.size, this.size);
            ctx.strokeStyle = 'black';
            ctx.fill();
            ctx.stroke();
        }

        Stone.prototype.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }

        function drawStone(e) {
            if ((30 > e.offsetX || e.offsetX >= 770 ) || (30 > e.offsetY || e.offsetY >= 770)) return;
            const [x, y] = [e.offsetX, e.offsetY];
            const [calibratedX, calibratedY] = [Math.round(x / cellSize) * cellSize, Math.round(y / cellSize) * cellSize];
            const [col, row] = [calibratedX / cellSize - 1, calibratedY / cellSize - 1];
            stoneColor = myTurn ? myConfig['stoneColor']['player1'] : myConfig['stoneColor']['player2'];
            console.log(calibratedX, calibratedY);
            if (!lines[row][col].isOccupied) {
                const stone = new Stone(calibratedX, calibratedY, stoneRadius, stoneColor);
                stone.draw();
                handleCell(row, col);
                myTurn = !myTurn
            }
        }

        function handleCell(row, col) {
            lines[row][col].isOccupied = true;
            const occupiedType = myTurn ? 1 : 2; 
            lines[row][col].occupiedType = occupiedType;
        }

        function makeInformation() {
            for (let j = 0; j < 19; j++) {
                let row = [];
                for (let i = 0; i < 19; i++) {
                    const lineInfo = {
                        x: i,
                        y: j,
                        offsetX: offsetX + i * cellSize,
                        offsetY: offsetY + j * cellSize,
                        isOccupied: false,
                        occupiedType: 0
                    }
                    row.push(lineInfo);
                }
                lines.push(row);
            }
        }

        function loop() {
            for (let j = 0; j < 18; j++) {
                for (let i = 0; i < 18; i++) {
                    const cell = new Cell(offsetX + i * cellSize, offsetY + j * cellSize, cellSize);
                    cell.draw();
                }
            }
        }

        
        requestAnimationFrame(loop);
        makeInformation();
        console.table(lines);
        omok.addEventListener("click", drawStone);