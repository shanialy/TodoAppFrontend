import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function CardBox() {
  const [expandedIndex, setExpandedIndex] = React.useState(-1);
  const [data, setData] = React.useState([]);
  const [text,setText]= React.useState('')
  const handleExpandClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

const getAllTodos = async () =>{
    try {        
        const data = await axios.get('http://localhost:5000/todo/all')
        if(data.data && data.data[0] && data.data[0].data){
         setData(data.data[0].data)
        }
    } catch (error) {
    }
}

  React.useEffect(() => {
    getAllTodos()
  }, []);

  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      console.log(expandedIndex);
      //addAPICALL
      //setText('')
      getAllTodos()
    }
  };
  return (
    <Card sx={{ maxWidth: 345 , maxHeight:450 , height:450 , width:345 , padding:'10px' ,overflowY:'auto' , borderTop:'10px solid black'}}>
      {data?.map((item, index)=>{
        const isExpanded = index === expandedIndex;
        return(
        <>       
      <Typography key={index} variant="div" sx={{display:'flex', justifyContent:'space-between' , margin:'0px 0px -10px 0px'}}>
      <Typography variant="p" sx={{fontWeight:600}}>
        {item.category}
      </Typography>
      <Typography variant="h6">
      <ExpandMore
          expand={isExpanded}
          onClick={() => handleExpandClick(index)}
          aria-expanded={isExpanded}
          aria-label="show more"
        >
            <KeyboardArrowDownIcon/>
        </ExpandMore>
      </Typography>
      </Typography>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {item?.tasks.map((i,index)=>{
            return(<>
            <Typography key={index} variant="div" sx={{display:'flex', marginLeft:'15px'}}>
            <Typography variant="div"><Checkbox defaultChecked={i.checked} {...label} /></Typography>
          <Typography variant="div" sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            {i.taskName}
            </Typography>
            </Typography>
            {i?.subtasks.map((subtask,index)=>{
              return(<>
            <Typography key={index} variant="div" sx={{display:'flex', marginLeft:'45px'}}>
           <Typography variant="div"><Checkbox defaultChecked={i.checked} {...label} /></Typography>
          <Typography variant="div" sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          {subtask.subtaskName}
            </Typography>
            </Typography>
              </>)
            })}
            </>
            )
          })}
        </CardContent>
        <Box
      sx={{
        '& .MuiTextField-root': { ml: 5, width: '20ch' },
      }}
    >
      <div>
        <TextField
          id="standard-search"
          label="Write ...."
          type="text"
          value={text}
          variant="standard"
          onKeyDown={handleKeyDown}
          onChange={(e)=>{setText(e.target.value)}}
        />

      </div>
    </Box>
      </Collapse>
        </>
        )
      })}
    </Card>
  );
}
