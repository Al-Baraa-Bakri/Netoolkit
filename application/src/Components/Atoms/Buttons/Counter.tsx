import React from 'react'

const Counter = ({number , addOne , minusOne}) => {
  return (
                        <div className="p-1 flex flex-1 items-center bg-gray-light max-w-[100px] gap-1 rounded-3xl">
                        <span className="block" onClick={() => minusOne()}>
                            <svg width="25" height="25" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8162 7.505C13.8162 11.2396 10.7887 14.2671 7.05407 14.2671C3.31948 14.2671 0.291992 11.2396 0.291992 7.505C0.291992 3.77041 3.31948 0.74292 7.05407 0.74292C10.7887 0.74292 13.8162 3.77041 13.8162 7.505Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.05407 12.676C9.90994 12.676 12.2251 10.3609 12.2251 7.505C12.2251 4.64913 9.90994 2.334 7.05407 2.334C4.19821 2.334 1.88307 4.64913 1.88307 7.505C1.88307 10.3609 4.19821 12.676 7.05407 12.676ZM7.05407 14.2671C10.7887 14.2671 13.8162 11.2396 13.8162 7.505C13.8162 3.77041 10.7887 0.74292 7.05407 0.74292C3.31948 0.74292 0.291992 3.77041 0.291992 7.505C0.291992 11.2396 3.31948 14.2671 7.05407 14.2671Z" fill="#F83248"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.26953 7.50495C4.26953 7.28527 4.44762 7.10718 4.6673 7.10718H9.44053C9.66022 7.10718 9.8383 7.28527 9.8383 7.50495C9.8383 7.72463 9.66022 7.90272 9.44053 7.90272H4.6673C4.44762 7.90272 4.26953 7.72463 4.26953 7.50495Z" fill="#F83248"/>
                            </svg>
                        </span>
                        <span className="bg-white rounded-full flex justify-center items-center flex-1">
                                {number}
                        </span>
                        <span className="block" onClick={() => addOne()}>
                            <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.3778" cy="7.505" r="5.96654" fill="white" stroke="#6680D9" stroke-width="1.59108"/>
                            <line x1="7.37775" y1="5.11847" x2="7.37775" y2="9.89171" stroke="#6680D9" stroke-width="0.795539" stroke-linecap="round"/>
                            <line x1="4.99103" y1="7.50506" x2="9.76427" y2="7.50506" stroke="#6680D9" stroke-width="0.795539" stroke-linecap="round"/>
                            </svg>
                        </span>
                    </div>
  )
}

export default Counter