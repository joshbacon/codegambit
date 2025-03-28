import { useAppSelector } from '../store/hooks';

import wbDark from '../assets/images/boards/wboardDark.png';
import wbLight from '../assets/images/boards/wboardLight.png';
import wbPurple from '../assets/images/boards/wboardPurple.png';
import wbBlue from '../assets/images/boards/wboardBlue.png';
import wbGreen from '../assets/images/boards/wboardGreen.png';
import wbOrange from '../assets/images/boards/wboardOrange.png';
import bbDark from '../assets/images/boards/bboardDark.png';
import bbLight from '../assets/images/boards/bboardLight.png';
import bbPurple from '../assets/images/boards/bboardPurple.png';
import bbBlue from '../assets/images/boards/bboardBlue.png';
import bbGreen from '../assets/images/boards/bboardGreen.png';
import bbOrange from '../assets/images/boards/bboardOrange.png';

import p from '../assets/images/pieces/bp.png';
import n from '../assets/images/pieces/bn.png';
import b from '../assets/images/pieces/bb.png';
import r from '../assets/images/pieces/br.png';
import q from '../assets/images/pieces/bq.png';
import k from '../assets/images/pieces/bk.png';

import P from '../assets/images/pieces/wp.png';
import N from '../assets/images/pieces/wn.png';
import B from '../assets/images/pieces/wb.png';
import R from '../assets/images/pieces/wr.png';
import Q from '../assets/images/pieces/wq.png';
import K from '../assets/images/pieces/wk.png';

function Board() {

    const { fen, playingAs } = useAppSelector(state => state.game);
    const { boardTheme, selected, previousMove, validMoves, mateSquare } = useAppSelector(state => state.visual);

    let theme: string = playingAs == 'w' ? wbDark : bbDark;
    switch (boardTheme) {
        case 'light':
            theme = playingAs == 'w' ? wbLight : bbLight;
            break;
        case 'purple':
            theme = playingAs == 'w' ? wbPurple : bbPurple;
            break;
        case 'blue':
            theme = playingAs == 'w' ? wbBlue : bbBlue;
            break;
        case 'green':
            theme = playingAs == 'w' ? wbGreen : bbGreen;
            break;
        case 'orange':
            theme = playingAs == 'w' ? wbOrange : bbOrange;
            break;
        default:
            theme = playingAs == 'w' ? wbDark : bbDark;
    }

    function mapWhiteToBlack(value: string) {
        let newValue: string = '1';
        if (value == '1') newValue = '8';
        else if (value == '2') newValue = '7';
        else if (value == '3') newValue = '6';
        else if (value == '4') newValue = '5';
        else if (value == '5') newValue = '4';
        else if (value == '6') newValue = '3';
        else if (value == '7') newValue = '2';
        else if (value == '8') newValue = '1';
        return newValue;
    }

    const boardRows: string[] = fen.split(' ')[0].split('/');
    const pieceData: { [id: string]: string } = {};
    for (let r: number = 0; r < boardRows.length; r++) {
        let counter: number = 0;
        for (let c: number = 0; c < boardRows[r].length; c++) {
            if (isNaN(Number(boardRows[r][c]))) {
                if (playingAs == 'w'){
                    pieceData[`${r+1}${c+1+counter}`] = boardRows[r].charAt(c);
                } else {
                    pieceData[mapWhiteToBlack(`${r+1}`)+mapWhiteToBlack(`${c+1+counter}`)] = boardRows[r].charAt(c);
                }
            } else {
                counter += Number(boardRows[r][c])-1;
            }
        }
    }

    function pieceLookup(piece: string) {
        switch (piece) {
            case 'p': return p;
            case 'P': return P;
            case 'r': return r;
            case 'R': return R;
            case 'n': return n;
            case 'N': return N;
            case 'B': return B;
            case 'b': return b;
            case 'Q': return Q;
            case 'q': return q;
            case 'K': return K;
            case 'k': return k;
        }
    }

    return <div className="relative w-[max(300px,60%)] lg:w-[70%] aspect-square">
        <img src={theme} draggable={false} className="-z-10 absolute w-full" />
        <div className='w-[96%] h-[96%] grid grid-cols-8 grid-rows-8 place-items-center'>
            {
                Object.entries(pieceData).map(([key, value]) => {
                    return <img
                        style={{gridRowStart: key.split('')[0], gridColumnStart: key.split('')[1]}}
                        key={key}
                        src={pieceLookup(value)}
                        draggable={false}
                        className='z-20 w-9/10 aspect-square'
                    />
                })
            }
            { selected ? <div
                    style= {{
                        gridRowStart: playingAs == 'w' ? selected.split('')[0] : mapWhiteToBlack(selected.split('')[0]),
                        gridColumnStart: playingAs == 'w' ? selected.split('')[1] : mapWhiteToBlack(selected.split('')[1])
                    }}
                    className='bg-purple-600 opacity-50 w-full h-full'
                /> : null
            }
            { previousMove ? <div
                style= {{
                    gridRowStart: playingAs == 'w' ? previousMove.split('')[0] : mapWhiteToBlack(previousMove.split('')[0]),
                    gridColumnStart: playingAs == 'w' ? previousMove.split('')[1] : mapWhiteToBlack(previousMove.split('')[1])
                }}
                className='bg-amber-200 opacity-50 w-full h-full'
                /> : null
            }
            { validMoves.length > 0 ? Object.entries(validMoves).map(([key, value]) => {
                return <div
                    key={key}
                    style= {{
                        gridRowStart: playingAs == 'w' ? value.split('')[0] : mapWhiteToBlack(value.split('')[0]),
                        gridColumnStart: playingAs == 'w' ? value.split('')[1] : mapWhiteToBlack(value.split('')[1])
                    }}
                    className='bg-green-600 opacity-50 w-full h-full'
                />
            }) : null }
            { mateSquare ? <div
                style= {{
                    gridRowStart: playingAs == 'w' ? mateSquare.split('')[0] : mapWhiteToBlack(mateSquare.split('')[0]),
                    gridColumnStart: playingAs == 'w' ? mateSquare.split('')[1] : mapWhiteToBlack(mateSquare.split('')[1])
                }}
                className='bg-red-600 opacity-50 w-full h-full'
                /> : null
            }
        </div>
    </div>
}

export default Board;