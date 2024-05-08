export const Button = ({children, ...props}: {children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={`rounded text-white font-bold py-2 px-6 bg-text hover:bg-primary focus:outline-none ${props.className}`}
        >
            {children}
            
        </button>
    );
}