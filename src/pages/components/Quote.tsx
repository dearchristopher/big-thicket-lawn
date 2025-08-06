import { useForm, Controller } from 'react-hook-form';
import { useState, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map } from './Map';

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface QuoteFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    propertySize: string;
    servicesNeeded: string;
    additionalNotes?: string;
}

interface GeocodedAddress {
    formatted: string;
    coordinates: [number, number];
    city?: string;
    state?: string;
    zipCode?: string;
}

interface AddressOption {
    value: string;
    label: string;
    data: GeocodedAddress;
}

export const Quote = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, control } = useForm<QuoteFormData>();
    const [geocodedAddress, setGeocodedAddress] = useState<GeocodedAddress | null>(null);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Default location (Lumberton, TX)
    const defaultLocation = {
        lat: 30.2627,
        lng: -94.1966,
        name: 'Lumberton, TX',
        zoom: 13
    };

    // Current map location (either selected address or default)
    const mapLocation = geocodedAddress ? {
        lat: geocodedAddress.coordinates[1],
        lng: geocodedAddress.coordinates[0],
        name: geocodedAddress.city ? `${geocodedAddress.city}, ${geocodedAddress.state}` : geocodedAddress.formatted,
        zoom: 17
    } : defaultLocation;

    // Geocoding function (without debouncing)
    const geocodeAddress = async (inputValue: string): Promise<AddressOption[]> => {
        if (!inputValue || inputValue.length < 3) return [];

        try {
            // Using Nominatim API - completely free, no API key required
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?` +
                `q=${encodeURIComponent(inputValue)}&` +
                `format=json&` +
                `countrycodes=us&` +
                `bounded=1&` +
                `viewbox=-95.5,29.5,-93.5,31.0`,
                {
                    headers: {
                        'User-Agent': 'BigThicketLawnServices/1.0 (contact@bigthicketlawn.com)' // Required by Nominatim
                    }
                }
            );

            const data = await response.json();

            if (data && data.length > 0) {
                return data.map((result: { display_name: string; lon: string; lat: string; address?: { house_number?: string; road?: string; city?: string; town?: string; village?: string; state?: string; postcode?: string } }) => {
                    const geocoded: GeocodedAddress = {
                        formatted: result.display_name,
                        coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
                        city: result.address?.city || result.address?.town || result.address?.village,
                        state: result.address?.state,
                        zipCode: result.address?.postcode,
                    };

                    // Create a shorter, more readable label
                    const shortLabel = [
                        result.address?.house_number,
                        result.address?.road,
                        result.address?.city || result.address?.town || result.address?.village,
                        result.address?.state
                    ].filter(Boolean).join(', ');

                    return {
                        value: geocoded.formatted,
                        label: shortLabel || geocoded.formatted,
                        data: geocoded
                    };
                });
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }

        return [];
    };

    // Debounced version for react-select (500ms delay)
    const debouncedGeocode = debounce((inputValue: string, callback: (options: AddressOption[]) => void) => {
        geocodeAddress(inputValue).then(callback);
    }, 500);

    const loadAddressOptions = useCallback(
        (inputValue: string, callback: (options: AddressOption[]) => void) => {
            debouncedGeocode(inputValue, callback);
        },
        [debouncedGeocode]
    );

    // Handle address selection from react-select
    const handleAddressSelect = (selectedOption: AddressOption | null) => {
        if (selectedOption) {
            setGeocodedAddress(selectedOption.data);
            setValue('address', selectedOption.value);
        } else {
            setGeocodedAddress(null);
            setValue('address', '');
        }
    };

    const onSubmit = async (data: QuoteFormData) => {
        try {
            setSubmitStatus('idle');

            // Prepare email data
            const emailData = {
                to: 'estimate@bigthicketlawn.com',
                subject: `New Quote Request from ${data.name}`,
                customerInfo: {
                    ...data,
                    geocodedAddress: geocodedAddress,
                    submittedAt: new Date().toISOString(),
                }
            };

            // For now, we'll use a simple mailto link or you can implement a backend API
            // Option 1: mailto link (immediate)
            const mailtoLink = `mailto:estimate@bigthicketlawn.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(
                `New Quote Request\n\n` +
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone}\n` +
                `Address: ${data.address}\n` +
                `${geocodedAddress ? `Geocoded Address: ${geocodedAddress.formatted}\n` : ''}` +
                `${geocodedAddress ? `Coordinates: ${geocodedAddress.coordinates.join(', ')}\n` : ''}` +
                `Property Size: ${data.propertySize}\n` +
                `Services Needed: ${data.servicesNeeded}\n` +
                `${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}\n` : ''}` +
                `\nSubmitted: ${new Date().toLocaleString()}`
            )}`;

            window.open(mailtoLink);

            // Option 2: You can replace this with an API call to your backend
            // const response = await fetch('/api/send-quote', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(emailData)
            // });

            setSubmitStatus('success');
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitStatus('error');
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center font-futura">REQUEST ESTIMATE</h3>
            <Map mapLocation={mapLocation} geocodedAddress={geocodedAddress} />

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Thank you! Your quote request has been submitted. We'll get back to you soon.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    There was an error submitting your request. Please try again or contact us directly.
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        placeholder="Full Name *"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        type="email"
                        placeholder="Email Address *"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                    <input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="tel"
                        placeholder="Phone Number *"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Address with Autocomplete */}
                <div>
                    <Controller
                        name="address"
                        control={control}
                        rules={{ required: 'Address is required' }}
                        render={({ field }) => (
                            <AsyncSelect
                                {...field}
                                loadOptions={loadAddressOptions}
                                onChange={(selectedOption) => {
                                    handleAddressSelect(selectedOption as AddressOption | null);
                                    field.onChange(selectedOption?.value || '');
                                }}
                                value={field.value ? { value: field.value, label: field.value, data: geocodedAddress! } : null}
                                placeholder="Start typing your property address..."
                                noOptionsMessage={({ inputValue }) =>
                                    inputValue.length < 3 ? 'Type at least 3 characters' : 'No addresses found'
                                }
                                loadingMessage={() => 'Searching addresses...'}
                                isClearable
                                isSearchable
                                cacheOptions
                                defaultOptions={false}
                                className={`react-select-container ${errors.address ? 'react-select-error' : ''
                                    }`}
                                classNamePrefix="react-select"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        minHeight: '48px',
                                        borderColor: errors.address ? '#ef4444' : state.isFocused ? '#10b981' : '#d1d5db',
                                        boxShadow: state.isFocused ? '0 0 0 2px rgba(16, 185, 129, 0.2)' : 'none',
                                        '&:hover': {
                                            borderColor: errors.address ? '#ef4444' : '#10b981'
                                        }
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: '#9ca3af'
                                    })
                                }}
                            />
                        )}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    {geocodedAddress && (
                        <p className="text-green-600 text-sm mt-1">✓ Address verified: {geocodedAddress.city}, {geocodedAddress.state}</p>
                    )}
                </div>

                {/* Property Size */}
                <div>
                    <select
                        {...register('propertySize', { required: 'Property size is required' })}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.propertySize ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">Select Property Size *</option>
                        <option value="small">Small (&lt; 0.25 acres)</option>
                        <option value="medium">Medium (0.25 - 0.5 acres)</option>
                        <option value="large">Large (0.5 - 1 acre)</option>
                        <option value="xlarge">Extra Large (&gt; 1 acre)</option>
                        <option value="commercial">Commercial Property</option>
                    </select>
                    {errors.propertySize && <p className="text-red-500 text-sm mt-1">{errors.propertySize.message}</p>}
                </div>

                {/* Services Needed */}
                <div>
                    <textarea
                        {...register('servicesNeeded', { required: 'Please describe the services needed' })}
                        placeholder="Services Needed (mowing, edging, trimming, etc.) *"
                        rows={3}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.servicesNeeded ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.servicesNeeded && <p className="text-red-500 text-sm mt-1">{errors.servicesNeeded.message}</p>}
                </div>

                {/* Additional Notes */}
                <div>
                    <textarea
                        {...register('additionalNotes')}
                        placeholder="Additional Notes (optional)"
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            SENDING REQUEST...
                        </>
                    ) : (
                        'SEND REQUEST'
                    )}
                </button>
            </form>

            <p className="text-gray-500 text-sm mt-4 text-center">
                * Required fields. We'll respond within 24 hours.
            </p>
        </div>
    );
};