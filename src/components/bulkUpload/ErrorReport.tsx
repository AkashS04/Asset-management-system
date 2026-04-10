export default function ErrorReport ({errors}:any) {
    return <>
    <div className="">
        <h4>Errors:</h4>
        {
            errors.map((err:any, i : number)=>{
                <p key={i}>Row:{err.row}: {err.message}</p>
            })
        }
    </div>
    </>
}