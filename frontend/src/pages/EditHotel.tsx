import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
    const { showToast } = useAppContext();
    const { hotelId } = useParams();
    const { data: hotel } = useQuery(
        'fetchMyHotelById',
        () => apiClient.fetchMyHotelById(hotelId || ''),
        {
            enabled: !!hotelId
        }
    );
    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({
                message: 'Hotel Saved!',
                type: 'SUCCESS'
            });
        },
        onError: () => {
            showToast({
                message: 'Error saving hotel',
                type: 'ERROR'
            });
        }
    });
    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };
    return (
        <div>
            <ManageHotelForm
                hotel={hotel}
                onSave={handleSave}
                isLoading={isLoading}
            />
        </div>
    );
};

export default EditHotel;
