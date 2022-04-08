import react from 'react';

const Button = ({children, ...rest}) => {

    return(
    <a 
        {...rest}
        className="btn btn-main mt-20">
        {children}
    </a>
    )
}

export default Button;