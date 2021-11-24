import React from "react"
import classes from './Pagination.module.css'

const Pagination = ({pagesArray, page, changePage}) => {
    return (
        <div className={classes.Pagination}>
            {pagesArray.map(p => 
                <span key={p} onClick={() => changePage(p)} className={page === p ? [classes.Pagination__btn, classes.active].join(' ') : classes.Pagination__btn}>
                    {p}
                </span>
            )}
        </div>
    )
}

export default Pagination