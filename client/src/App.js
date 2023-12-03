import React,{Fragment} from "react";

//Components//
import InputToDo from "./components/InputToDo";
import ListToDos from "./components/ListToDos";

function App(){
return(
<Fragment>
<div className="container">
<InputToDo/>
<ListToDos/>
</div>

</Fragment>
)

}

export default App;