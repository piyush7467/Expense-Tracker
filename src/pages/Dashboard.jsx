import { Card } from '@/components/ui/card';
import { store } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const { user } = useSelector(store => store.auth);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <h1>Welcome! {user?.name}</h1>

            {/* General */}
            <Card onClick={() => navigate("/dashboard/general")}>
                📅 General Expenses
            </Card>

            {/* Notes */}
            <Card onClick={() => navigate("/dashboard/notes")}>
                📝 Notes
            </Card>

            {/* Special */}
            <Card onClick={() => navigate("/dashboard/special")}>
                ✈️ Special Context
            </Card>

        </div>

    )
}

export default Dashboard