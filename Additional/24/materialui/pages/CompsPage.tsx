import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckBoxes1 from '../components/CheckBoxes1';
import CheckBoxes2 from '../components/CheckBoxes2';
import CheckBoxes3 from '../components/CheckBoxes3';
import FloatingActionButton from '../components/FloatingActionButton';
import FloatingActionButton2 from '../components/FloatingActionButton2';
//import DateTimePickers from '../components/DateTimePickers';
import NativeDateTimePicker from '../components/NativeDateTimePicker';
import RadioGroup from '../components/RadioGroup';
import TransferList from '../components/TransferList';

const CompsPage:React.FC = () =>
    <GenericTemplate title="コンポーネント" >
        <>Material-UI コンポーネントのサンプル</>
        <ol>
        <li>ボタン</li>
        <Box m={2}>
            <Button variant="contained">Default</Button>
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="contained" disabled>
                Disabled
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>
            <p/>
            <Button>Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button disabled>Disabled</Button>
            <Button href="#text-buttons" color="primary">
                Link
            </Button>
            <p/>
            <Button variant="outlined">Default</Button>
            <Button variant="outlined" color="primary">
            Primary
            </Button>
            <Button variant="outlined" color="secondary">
            Secondary
            </Button>
            <Button variant="outlined" disabled>
            Disabled
            </Button>
            <Button variant="outlined" color="primary" href="#outlined-buttons">
            Link
            </Button>
            <p/>
            <Button onClick={() => { alert('clicked') }}>Click me</Button>
        </Box>

        <li>ボタングループ</li>
        <Box m={2}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            </ButtonGroup>
            <p/>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            </ButtonGroup>
            <p/>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            </ButtonGroup>            
        </Box>

        <li>チェックボックス</li>
        <Box m={2}>
            <CheckBoxes1/>
            <CheckBoxes2/>
            <CheckBoxes3/>            
        </Box>

        <li>フローティングアクションボタン</li>
        <Box m={2}>
            <FloatingActionButton/>
            <FloatingActionButton2/>
        </Box>

        <li>日付＆時間ピッカー</li>
        <Box m={2}>
            {/* <DateTimePickers/> */}
            <NativeDateTimePicker/>   
        </Box>

        <li>ラジオ</li>
        <Box m={2}>
            <RadioGroup/>
        </Box>

        <li>転送リスト</li>
        <Box m={2}>
            <TransferList/>
        </Box>
        </ol>
    </GenericTemplate>
;

export default CompsPage;
