import PropTypes from 'prop-types';


const DisplayHeader = ({ header }) => {
    return (
        <h1>{header}</h1>
    )
}

DisplayHeader.propTypes = {
    header: PropTypes.string.isRequired,
};

const DisplayParts = ({ parts }) => {
    return (
        <div>
            {parts.map(part => (
                <div key={part.id}>
                    {part.name} {part.exercises}
                </div>
            ))}
        </div>
    )
}

DisplayParts.propTypes = {
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            exercises: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        })
    ).isRequired
};


const AmountOfExercises = ({ parts }) => {
    return (
        <div>
            <b>Total of {parts.reduce((total, part) => (total += part.exercises), 0)} exercises</b>
        </div>
    )
}

AmountOfExercises.propTypes = {
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            exercises: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        })
    ).isRequired
};


const Course = ({ course }) => {
    return (
        <div>
            <DisplayHeader header={course.name} />
            <DisplayParts parts={course.parts} />
            <AmountOfExercises parts={course.parts} />
        </div>
    )
}

Course.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        parts: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                exercises: PropTypes.number.isRequired,
                id: PropTypes.number.isRequired
            })
        ).isRequired
    }).isRequired
};

export default Course