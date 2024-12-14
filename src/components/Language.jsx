

export default function Language(props){


    return(

        <>
        <section className="lang">
            <button style={{background : props.background,
                color : props.color
            }} >
                {props.names}
            </button>
        </section>
        </>
    )
}