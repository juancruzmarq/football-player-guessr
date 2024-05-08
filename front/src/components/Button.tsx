export const Button = ({children, ...props}: {children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={`bg-slate-300 rounded-lg font-bold py-2 px-4 hover:rounded hover:bg-slate-400 shadow-lg ease-in-out transition ${props.className}`}
        >
            {children}
            
        </button>
    );
}