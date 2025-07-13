import './Frontpage.css'



function Frontpage(props)
{
    const frontcontent = [        
            {
            title: 'Lorem ipsum.',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
            },
            {
            title: 'Lorem ipsum.',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
            },
            {
            title: 'Lorem ipsum.',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
            },
            {
            title: 'Lorem ipsum.',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
            },
        ]
    

    return(
        <div className='frontpage' style={{marginLeft:props.marginleft+'px'}}>
            <div className='container' >
                <div className='greeting'>
                    <h1>{'Hi, '+props.name} </h1>
                </div>
                {
                    frontcontent.map((contentlist)=>(
                                                
                        <div className='content'>
                            <h3>{contentlist.title}</h3>
                            <p>{contentlist.content}</p>
                        </div>
                        
                    ))
                }        
                
            </div>
            
        </div>
    );
}

export default Frontpage;